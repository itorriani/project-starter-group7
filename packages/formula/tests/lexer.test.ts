import { expect, test } from 'vitest';
import { Literal, Token } from "../src/token.ts";
import tokenize from "../src/lexer.ts";

test("literal number is one token", () => {
  const [t1] = tokenize("3");
  expect(t1.type).toBe("NUMBER");
  const l1 = t1 as Literal<number>;
  expect(l1.value).toBe(3);
});
