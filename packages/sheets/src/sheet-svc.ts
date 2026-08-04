import {
  AbsoluteReference,
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

let storedSheets: Map<string, WithId<Sheet>> = new Map();

function create(sheet: Sheet) : WithId<Sheet> {
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

function get(id: string): WithId<Sheet> | undefined {
  return // TODO: [Assignment 1] get the sheet from storedSheets

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


function getRows(
  id: string,
  start: number = 0,
  limit?: number
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

  return { rows, start, count: rows.length }
}

function patch(
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
    const {row, column}= parseKey(key as RCKey);
    // TODO: update the value of the cell addressed
    //       by this key
  });

  return patch;
}

export default { create, get, getRows, patch };
