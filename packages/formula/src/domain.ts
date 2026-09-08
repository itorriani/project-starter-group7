import { AbsoluteReference, Reference, RCKey, parseKey, sparseKeyOf, relativeToAbsolute } from "@poly-sheets/types";
import { Expr } from "./expr.ts";

export default function domain(
  expr: Expr,
  base: AbsoluteReference = {row: 0, column: 0}
): AbsoluteReference[] {
  const refs = new Set<RCKey>();
  visit(expr);
  return Array.from(refs.keys()).map(parseKey);

  function visit(expr: Expr) {
    switch (expr[0]) {
      case "LITERAL":
        return;
      case "REFERENCE":
        refs.add(sparseKeyOf(relativeToAbsolute(expr[1], base)));
        return;
      case "GROUPING":
        visit(expr[1]);
        return;
      case "UNARY":
        visit(expr[2]);
        return;
      case "BINARY":
        visit(expr[2]);
        visit(expr[3]);
        return;
      case "TERNARY":
        visit(expr[1]);
        visit(expr[2]);
        visit(expr[3]);
        return;
      case "CALL":
        const [_, fn, args] = expr;
        args.forEach(visit);
        return;
      default:
        return;
    }
  }
}
