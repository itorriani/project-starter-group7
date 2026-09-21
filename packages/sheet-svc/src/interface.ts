import {
  AbsoluteReference,
  MoreRows,
  Sheet,
  Sparse,
  Value,
  WithId
} from "@poly-sheets/types";

export interface SheetService {

  // Add a sheet to the collection, and assign an id
  addSheet(sheet: Sheet): WithId<Sheet>;

  // Return the sheet from the collection with the given id.
  // A maximum of `maxRows` rows of data are included.
  getSheetById(
    id: string,
    maxRows?: number
  ): Sheet | undefined;

  // Return rows of data, starting at `startRow` (default to 0), and
  // including at least `maxRows` (default to reading all the way to end).
  getCellsInRange(
    id: string,
    startRow?: number,
    maxRows?: number
  ): MoreRows | undefined;

  // Return a single cell's value
  getCellValue(
    id: string,
    ref: AbsoluteReference
  ): Value | undefined;

  // Modify values in sheet, as indicated in the `patch`
  updateSheetValues(
    id: string,
    patch: Sparse<Value>
  ): Sparse<Value> | { values: Sparse<Value>, formulas: Sparse<string> } | undefined;
}
