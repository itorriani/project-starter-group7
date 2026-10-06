import { type Reference, type PrimitiveType } from "@poly-sheets/types";


export type Expr =
  | ["LITERAL", PrimitiveType]
  | ["REFERENCE", Reference]
  | ["GROUPING", Expr]
  | ["UNARY", op: UnaryOp, arg: Expr]
  | ["BINARY", op: BinaryOp, left: Expr, right: Expr]
  | ["TERNARY", cond: Expr, then: Expr, else_: Expr]
  | ["CALL", name: string, args: Expr[]]
  | ["ERROR", message: string, input: string]

export type UnaryOp =
  | "MINUS"
  | "NOT"
  ;

export type BinaryOp =
  | "PLUS"
  | "MINUS"
  | "SLASH"
  | "STAR"
  | "CARET"
  | "EQ"
  | "NE"
  | "LT"
  | "GT"
  | "LTE"
  | "GTE"
  | "AND"
  | "OR"
