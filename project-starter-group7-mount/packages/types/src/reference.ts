
type AbsRow = { row: number };
type RelRow = { rowOffset: number };
type AbsCol = { column: number };
type RelCol = { colOffset: number };

export type AbsoluteReference = AbsRow & AbsCol;
export type RelativeReference =
  | RelRow & RelCol
  | AbsRow & RelCol
  | RelRow & AbsCol;

export type Reference = AbsoluteReference | RelativeReference;

export function relativeToAbsolute(
  rel: Reference,
  base: AbsoluteReference
): AbsoluteReference {
  return {
    column: "column" in rel ? rel.column : base.column + rel.colOffset,
    row: "row" in rel ? rel.row : base.row + rel.rowOffset
  }
}
