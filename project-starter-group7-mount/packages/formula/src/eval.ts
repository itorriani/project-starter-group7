import { ErrorValue, IntrinsicValue, Value, Reference, PrimitiveType } from "@poly-sheets/types";
import { BinaryOp, Expr, UnaryOp } from "./expr.ts";
import { evalFunction } from "./functions.ts";

export default function evaluate(
  expr: Expr,
  lookup: (ref: Reference) => Value
): Value {
  const ev = (e: Expr) => evaluate(e, lookup)

  switch (expr[0]) {
    case "LITERAL":
      return new IntrinsicValue(expr[1]);
    case "REFERENCE":
      return lookup(expr[1]);
    case "GROUPING":
      return ev(expr[1]);
    case "UNARY": {
      const [_, op, x] = expr;
      return evalUnary(op, ev(x));
    }
    case "BINARY": {
      const [_, op, l, r] = expr;
      return evalBinary(op, ev(l), ev(r));
    }
    case "TERNARY": {
      const [_, cond, then, else_] = expr;
      return ev(cond) ? ev(then) : ev(else_);
    }
    case "CALL": {
      const [_, fn, args] = expr;
      return evalFunction(fn, ...args.map((e) => ev(e)));
    }
    default:
      return new ErrorValue(`invalid expression type ${expr[0]}`);
  }
}

const expectedNumber = new ErrorValue("expected number");
const expectedString = new ErrorValue("expected string");
const expectedBoolean = new ErrorValue("expected boolean");
const requiresSameType = new ErrorValue("arguments must be same type");

function intrinsicOp<R extends PrimitiveType, A extends PrimitiveType = R>(
  op: (...args: A[]) => R,
  ...args: Value[]
): IntrinsicValue {
  const opargs = args.map((a) =>
    a.isNumber() ? a.toNumber() : a.toString()
  ) as A[];
  const result = op(...opargs);
  return new IntrinsicValue(result);
}

function evalUnary(op: UnaryOp, arg: Value): Value {
  if (arg.isError()) return arg;
  switch (op) {
    case "MINUS":
      if (!arg.isNumber()) return expectedNumber;
      return intrinsicOp((x: number) => -x, arg);
    case "NOT":
      return intrinsicOp((x) => !x, arg);
  }
}

function evalBinary(op: BinaryOp, left: Value, right: Value): Value {
  if (left.isError()) return left;
  if (right.isError()) return right;
  switch (op) {
    case "PLUS":
      if (left.isNumber() && right.isNumber())
        return intrinsicOp<number>((a, b) => a + b, left, right);
      else
        return intrinsicOp<string>((a, b) => a + b, left, right);
    case "MINUS":
      if (!left.isNumber() || !right.isNumber())
        return expectedNumber;
      return intrinsicOp<number>((a, b) => a - b, left, right);
    case "STAR":
      if (!left.isNumber() || !right.isNumber())
        return expectedNumber;
      return intrinsicOp<number>((a, b) => a * b, left, right);
    case "SLASH":
      if (!left.isNumber() || !right.isNumber())
        return expectedNumber;
      if (right.toNumber() === 0) return new ErrorValue("division by zero");
      return intrinsicOp<number>((a, b) => a / b, left, right);
    case "CARET":
      if (!left.isNumber() || !right.isNumber())
        return expectedNumber;
      return intrinsicOp<number>((a, b) => a ^ b, left, right);
    case "EQ":
      return intrinsicOp<boolean, PrimitiveType>((a, b) => a == b, left, right);
    case "NE":
      return intrinsicOp<boolean, PrimitiveType>((a, b) => a != b, left, right);
    case "LT":
      if (left.isNumber() && right.isNumber())
        return intrinsicOp<boolean, number>((a, b) => a < b, left, right);
      else
        return intrinsicOp<boolean, string>((a, b) => a < b, left, right);
    case "GT":
      if (left.isNumber() && right.isNumber())
        return intrinsicOp<boolean, number>((a, b) => a > b, left, right);
      else
        return intrinsicOp<boolean, string>((a, b) => a > b, left, right);
    case "LTE":
      if (left.isNumber() && right.isNumber())
        return intrinsicOp<boolean, number>((a, b) => a <= b, left, right);
      else
        return intrinsicOp<boolean, string>((a, b) => a <= b, left, right);
    case "GTE":
      if (left.isNumber() && right.isNumber())
        return intrinsicOp<boolean, number>((a, b) => a >= b, left, right);
      else
        return intrinsicOp<boolean, string>((a, b) => a >= b, left, right);
    default:
      return new ErrorValue(`invalid operator: ${op}`);
  }
}
