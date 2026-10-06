export interface Token  {
  type: TokenType;
  content: string;
}

export interface Literal<T> extends Token {
  value: T;
}

export type TokenType =
  | "STRING"
  | "NUMBER"
  | "BOOLEAN"
  | "NULL"
  | "MINUS"
  | "PLUS"
  | "SLASH"
  | "STAR"
  | "CARET"
  | "EQ"
  | "NE"
  | "LT"
  | "GT"
  | "LTE"
  | "GTE"
  | "NOT"
  | "AND"
  | "OR"
  | "QUESTION"
  | "COLON"
  | "LPAREN"
  | "RPAREN"
  | "COMMA"
  | "NAME"
  | "AT"
  | "ROW"
  | "COLUMN"
  | "BANG"
  ;

export function token(type: TokenType, content: string): Token {
  return { type, content };
}

export function literal<T>(type: TokenType, content: string, value: T): Literal<T> {
  return { type, content, value };
}
