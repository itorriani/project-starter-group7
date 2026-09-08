import { IntrinsicValue, Value } from "./value.ts";
import { Sparse } from "./sparse.ts";

export interface Sheet {
  name: string;
  columns: string[];
  nrows: number;
  cells: Value[][];
  formulas?: Sparse<string>;
}

export interface MoreRows {
  rows: Value[][];
  formulas?: Sparse<string>;
  start: number;
  count: number;
}

export function newSheet(
  ncolumns: number = 0, nrows: number = 0, name: string = "New Sheet"
): Sheet {
  const columns = Array.from({ length: ncolumns }, (_, i) => defaultColumnName(i));
  const cells = Array.from({ length: nrows }, () =>
    Array.from({ length: ncolumns }, () => new IntrinsicValue() )
  );

  return { name, columns, nrows, cells, formulas: {} };
}

export function defaultColumnName(i: number): string {
    const A = "A".charCodeAt(0);
    if ( i < 26 ) return String.fromCharCode(A + i);
    const final = String.fromCharCode(A + i % 26);
    return defaultColumnName(i/26 - 1) + final;
}
