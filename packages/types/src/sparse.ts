import { AbsoluteReference }  from "./reference.ts";

export type Sparse<T> = Record<RCKey, T>;

export type RCKey = `R${number}C${number}`;

export function sparseKeyOf(ref: AbsoluteReference): RCKey {
  return `R${ref.row}C${ref.column}`;
}

const RC_RE = /([RC])/;

export function parseKey(key: RCKey): AbsoluteReference {
  const [_, r, rowString, c, colString] = key.split(RC_RE);
  const row = parseInt(c === "R" ? colString : rowString);
  const column = parseInt(r === "C" ? rowString : colString);
  return { row, column };
}
