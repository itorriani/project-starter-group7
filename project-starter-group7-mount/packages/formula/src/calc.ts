import {
  Reference, Sparse, Value, parseKey, RCKey,
  sparseKeyOf,
  relativeToAbsolute,
  AbsoluteReference
} from "@poly-sheets/types";
import { Expr } from "./expr.ts";
import evaluate from "./eval.ts";
import { DAG, Node, createNode } from "./dag.ts";

export default function calculate(
  dag: DAG,
  keys: RCKey[],
  lookup: (ref: AbsoluteReference) => Value,
  previous: Sparse<Value> = {}
): Sparse<Value> {
  let frontier = keys.map((key) => dag[key] || createNode(key));
  const next: Sparse<Value> = {};

  function lookupInContext(base: AbsoluteReference):
    (ref: Reference) => Value {
    return (rel: Reference) => {
      const abs = relativeToAbsolute(rel, base)
      const key = sparseKeyOf(abs);
      return key in next ? next[key] :
        key in previous ? previous[key] : lookup(abs);
    };
  }

  while (frontier.length > 0) {
    const forward: Set<Node> = new Set();

    frontier.sort((a, b) => (a.level || 0) - (b.level || 0));

    frontier.forEach((node: Node) => {
      const { key, expr } = node;
      if (key in next) return;
      const base: AbsoluteReference = parseKey(key);
      const previousValue: Value | undefined = previous[key];
      if ( expr ) {
        const result = evaluate(expr, lookupInContext(base));
        console.log(`Evaluated ${key}:`, result);
        if ( result.isEqual(previousValue) ) return; // stop propagating forward
        next[key] = result;
      }
      node.downstream.forEach((key) => forward.add(dag[key]));
    });

    frontier = forward.values().toArray();
  }

  return next;
}
