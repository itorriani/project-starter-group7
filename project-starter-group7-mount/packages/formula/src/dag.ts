import { Expr } from "./expr.ts";
import domain from "./domain.ts";
import parse from "./parser.ts";
import {
  AbsoluteReference, parseKey, RCKey, Sparse, sparseKeyOf
} from "@poly-sheets/types";

export type DAG = Sparse<Node>

export interface Node {
  key: RCKey,
  expr: Expr | null;
  downstream: Set<RCKey>;
  upstream: Set<RCKey>;
  level: number;
}

export function isInput(node: Node): boolean {
  return !node.expr;
}

const parserCache: { [formula: string]: Expr } = {};

export function createNode(
  key: RCKey,
  formula?: string
): Node {
  let expr: Expr | null = null;

  if (formula) {
    if (formula in parserCache) {
      expr = parserCache[formula]
    } else {
      expr = parse(formula);
      parserCache[formula] = expr;
    }
  }

  const upstreamKeys = expr ? domain(expr, parseKey(key))
    .map((abs) => sparseKeyOf(abs))
    : [];

  return {
    key,
    expr,
    upstream: new Set(upstreamKeys),
    downstream: new Set(),
    level: 0
  };
}

export function addToDAG(dag: DAG, formulas: Sparse<string>) {
  Object.entries(formulas).forEach(([key, formula]) => {
    insertOrUpdate(dag, key as RCKey, formula);
  })
}

export function insertOrUpdate(
  dag: DAG,
  key: RCKey,
  formula: string
) {
  const node = createNode(key, formula);
  if (!node) return;

  if (key in dag) {
    const existing = dag[key];
    if (existing.expr === node.expr) return; // no change
    // remove existing from upstreams' downstreams
    existing.upstream.forEach((k) => {
      const up = dag[k];
      if (up) up.downstream.delete(key);
    });
    // adopt existing's downstreams
    node.downstream = existing.downstream;
  }
  dag[key] = node;
  node.upstream.forEach((k) => {
    const up = dag[k] || (dag[k] = createNode(k));
    up.downstream.add(key);
    node.level = Math.max(node.level || 0, up.level + 1)
  });
  incrementDownstreamLevels(node);

  function incrementDownstreamLevels(node: Node) {
    const level = node.level || 0;
    node.downstream.forEach((key) => {
      const down = dag[key];
      if ( !down?.level || down.level < level + 1) {
        down.level = level + 1;
        incrementDownstreamLevels(down);
      }
    });
  }
}
