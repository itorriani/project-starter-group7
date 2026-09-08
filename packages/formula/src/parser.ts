import type { Reference, AbsoluteReference, RelativeReference } from "@poly-sheets/types";
import type { Literal, Token, TokenType } from "./token.ts";
import tokenize from "./lexer.ts";
import type { Expr, BinaryOp, UnaryOp } from "./expr.ts";


export default function parse(input: string): Expr {
  const tokens = tokenize(input);
  let current = 0;
  const advance = () => tokens[current++];
  const peek = () => tokens[current];
  const check = (type: TokenType) =>
    current < tokens.length
      ? peek().type === type
      : false
  const match = (...types: TokenType[]) => {
    for( const t of types ) {
      if (check(t)) return advance();
    }
    return undefined;
  }
  const fail = (msg: string) => {
    const token = peek();
    const message = `${msg} at ${token}`;
    throw ["ERROR", message, input];
  }
  const consume = (type: TokenType, msg: string = "") => {
    if (check(type)) return advance();
    throw fail(msg || `Expecting ${type}`);
  }

  let result: Expr;

  try {
    result = expression();
  } catch (err: unknown) {
    if (Array.isArray(err) && err[0] === "ERROR")
      result = err as Expr;
    else
      result = ["ERROR", "unknown error", input];
  }

  return result;

  function expression(): Expr {
    return equality(); // for now ... add logicals here
  }

  function equality(): Expr {
    let expr: Expr = comparison();
    let t: Token | undefined;
    while(t = match("EQ", "NE")) {
      const right = comparison();
      expr = ["BINARY", t.type as BinaryOp, expr, right];
    }

    return expr;
  }

  function comparison(): Expr {
    let expr: Expr = term();
    do {
      let t = match("LT", "LTE", "GT", "GTE" );
      if (!t) break;
      const right = term();
      expr = ["BINARY", t.type as BinaryOp, expr, right];
    } while (true);

    return expr;
  }

  function term(): Expr {
    let expr: Expr = factor();
    do {
      const t = match("PLUS", "MINUS" );
      if (!t) break;
      const right = factor();
      expr = ["BINARY", t.type as BinaryOp, expr, right];
    } while (true);

    return expr;
  }

  function factor(): Expr {
    let expr: Expr = unary();
    do {
      const t = match("STAR", "SLASH" );
      if (!t) break;
      const right = factor();
      expr = ["BINARY", t.type as BinaryOp, expr, right];
    } while (true);

    return expr;
  }

  function unary(): Expr {
    const t = match("NOT", "MINUS");
    if (!t) return primary();
    const arg = unary();
    return ["UNARY", t.type as UnaryOp, arg];
  }

  function primary(): Expr {
    let t = match("STRING", "BOOLEAN", "NUMBER", "NULL",
      "LPAREN", "NAME", "AT");
    switch (t?.type) {
      case "STRING":
        return ["LITERAL", (t as Literal<string>).value];
      case "BOOLEAN":
        return ["LITERAL", (t as Literal<boolean>).value];
      case "NUMBER":
        return ["LITERAL", (t as Literal<number>).value];
      case "NULL":
        return ["LITERAL", (t as Literal<null>).value];
      case "LPAREN": {
        const inside = expression();
        consume("RPAREN", "expecting `)` after expression");
        return ["GROUPING", inside];
      }
      case "AT": return ["REFERENCE", reference()];
      case "NAME": {
        const args: Expr[] = [];
        if (match("LPAREN")) {
          args.push(expression());
          do {
            const comma = match("COMMA");
            if (!comma) break;
            args.push(expression());
          } while (true);
          consume("RPAREN", "expecting ',' or ')'");
        }
        return ["CALL", (t as Literal<string>).value, args];
      }
    }

    throw fail("Expecting literal, function, reference, or parenthesized expression");
  }

  function reference(): Reference {
    consume("ROW", "expecting 'R'");
    let rowspec: { row: number } | { rowOffset: number } | undefined;
    let r = match("NUMBER", "PLUS", "BANG");
    if (!r) throw fail("Expecting row index");

    switch (r.type) {
      case "BANG":
        rowspec = { rowOffset: 0 };
        break;
      case "PLUS":
        r = consume("NUMBER", "expecting a number");
        rowspec = { rowOffset: (r as Literal<number>).value };
        break;
      default:
        const n = (r as Literal<number>).value;
        if (n < 0) rowspec = { rowOffset: n };
        else rowspec = { row: n };
    }

    consume("COLUMN", "expecting 'C'");
    let colspec: { column: number } | { colOffset: number } | undefined;
    let c = match("NUMBER", "PLUS", "BANG");
    if (!c) throw fail("Expecting column index");

    switch (c.type) {
      case "BANG":
        colspec = { colOffset: 0 };
        break;
      case "PLUS":
        c = consume("NUMBER", "expecting a number");
        colspec = { colOffset: (r as Literal<number>).value };
        break;
      default:
        const n = (c as Literal<number>).value;
        if (n < 0) colspec = { colOffset: n };
        else colspec = { column: n };
    }

    return { ...colspec, ...rowspec };
  }
}
