import {
  MoreRows,
  RCKey,
  Sheet,
  Sparse,
  Value,
  WithId,
  newSheet,
  parseKey
} from "@poly-sheets/types";
import { v4 as uuidv4 } from "uuid";
import { SheetService } from "./interface.ts";

export class InMemorySheetService implements SheetService {

  storedSheets: Record<string, Sheet> = {};

  addSheet(
    sheet: Sheet
  ): WithId<Sheet> {
    const id = uuidv4();
    // TODO: declare a variable `stored`. Initialize it
    //       to a new object which contains all properties
    //       from `sheet`, plus an additional `id`
    //
    // const stored: WithId<Sheet> = { ... };

    // TODO: add the `stored` object to the `storedSheets`
    //       map with key `id`. Then return `stored`

    // TODO: remove the following line when done:
    return { ...newSheet(10, 10), id: "not a sheet" };
  }

  getSheetById(
    id: string,
    maxRows?: number
  ): Sheet | undefined {
    // TODO: [Assignment 1] get the sheet from storedSheets
    //
    const fullSheet = undefined; // <- replace w/ your code

    return fullSheet;

    // ======== Assignment 3 =========

    // TODO: Add an optional second parameter `limit` of type `number`
    //       to this function's signature.

    // TODO: Replace the `return` statement with this variable
    //       declaration:
    //
    // const fullSheet = ... (the value that you had returned)


    // TODO: Implement the following logic:
    //    1. if the sheet was not found or `limit` is undefined,
    //       return fullSheet. (This replicates the previous behavior.)
    //    2. create a new array containing only the first `limit` rows
    //       from `fullSheet.cells`. (Hint: look up Array.slice())
    //    3. return the `fullSheet`, but replace the `cells` field with
    //       the shorter array. Leave all other fields (including `nrows`)
    //       unchanged.
  }

  getCellsInRange(
    id: string,
    startRow: number = 0,
    maxRows?: number
  ): MoreRows | undefined {
    // ======== Assignment 3 ========

    // TODO: Declare variable `sheet` and initialize it by
    //       getting the correct sheet from storedSheets
    //
    // const sheet = ...
    //
    // TODO: If the sheet does not exist, return undefined
    //
    // if (!sheet) return sheet;
    //
    // TODO: Replace the following empty array with rows
    //       of cells from sheet.cells, starting with row
    //       `start`, and continuing for at most `limit`
    //       rows. If `limit` is undefined, continue to
    //       the end of `sheet.cells`

    const rows: Value[][] = [];

    return { rows, startRow, count: rows.length }
  }

  updateSheetValues(
    id: string,
    patch: Sparse<Value>
  ): Sparse<Value> | undefined {
    // TODO: Declare variable `sheet` and initialize it by
    //       getting the correct sheet from storedSheets
    //
    // const sheet = ...
    //
    // TODO: If the sheet does not exist, return undefined
    //
    // if (!sheet) return sheet;

    Object.entries(patch).forEach(([key, value]) => {
      const {row, column} = parseKey(key as RCKey);
      // TODO: update the value of the cell addressed
      //       by this key
    });

    return patch;
  }

}
