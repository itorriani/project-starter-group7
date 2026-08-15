import {
  AbsoluteReference,
  IntrinsicValue,
  MoreRows,
  RCKey,
  Sheet,
  Sparse,
  Value,
  WithId,
  parseKey
} from "@poly-sheets/types";
import { v4 as uuidv4 } from "uuid";
import Database from 'better-sqlite3';
import { SheetService } from "./interface.ts"; ''

const dbName = process.env.DB_NAME || "poly-sheets";
const db = new Database(`${dbName}.db`);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS sheets (
    -- TODO: write the schema for holding basic
    --       information about each sheet:
    --
    -- id, a UUID, the primary key
    -- name and nrows as from the TS interface Sheet
  )
  `);

db.exec(`
  CREATE TABLE IF NOT EXISTS columns (
    -- TODO: write the schema for holding all column
    --       names for all sheets. Index the names
    --       by (sheet id, column #), which must
    --       be unique
  )
  `);

db.exec(`
  CREATE TABLE IF NOT EXISTS cells (
    -- TODO: write the schema for holding all cell
    --       data in all sheets. Index the cells by
    --       (sheet id, row #, column #) which must.
    --       be unique.
    --       Store string values and numeric values
    --       in separate columns to avoid conversion
    --       issues.
  )
  `);

const addSheet = db.prepare<
  [string, string, number]
  >(`
  -- TODO: write an INSERT statement that takes
  --       (id, name, nrows) and inserts a row
  --       into the sheets table
  `);

const addColumn = db.prepare<
  [string, number, string]
  >(`
  -- TODO: write an INSERT statement that takes
  --       (sheet id, column #, column name) and
  --       adds a rows to the columns table
`);

const selectSheet = db.prepare<
  [string],
  { id: string; name: string; nrows: number }
  >(`
  -- TODO: write a SELECT statement that gets a
  --       row from the sheets table, given an id
`);

const selectColumns = db.prepare<
  [string],
  { column: number, name: string }
  >(`
  -- TODO: write a SELECT statement that gets all
  --       columns numbers and names from the
  --       columns table, given a sheet id.
  --       Return the rows ordered by column #.
`)

const countColumns = db.prepare<
  [string], { ncolumns: number }
  >(`
  -- TODO: write a SELECT statement that gets a
  --       count of the number of columns in a sheet
`);

const selectValues = db.prepare<
  [id: string, start: number, end: number],
  {
    row: number, column: number,
    strval: string | null,
    numval: number | null
  }
  >(`
  -- TODO: write a SELECT statement that gets all
  --       cell values for a sheet, starting with
  --       "start" row, and up to (not including)
  --       "end" row
  `);

const updateValue = db.prepare<
  [id: string, row: number, column: number,
    strval: string | null, numval: number | null]
  >(`
  -- TODO: write a SQL statement which will insert a
  --       new value or replace an existing value
  --       at the given "row" and "column"
  --       in a sheet's cell values
  `);


export class SQLiteSheetService implements SheetService {

  // Add a sheet to the collection, and assign an id
  addSheet(sheet: Sheet): WithId<Sheet> {
    const id = uuidv4();
    const stored = { id, ...sheet };

    const createSheet = db.transaction((sh: WithId<Sheet>) => {
      // TODO: run the `addSheet` prepared statement to
      //       add the sheet to the `sheets` table

      // TODO: for each column name, run the `addColumn`
      //       prepared statement

      // TODO: for each cell (row x column), run the
      //       `updateValue` prepared statement.
      //
      //       Do not store null values. Hint: use
      //       Value.isEmpty() to check.
      //
      //       Use `Value.isNumber()` to determine whether
      //       to set `numval` or `strval`. Only one should
      //       be non-null.
    });

    createSheet(stored);

    return stored;
  }

  // Return the sheet from the collection with the given id.
  // A maximum of `maxRows` rows of data are included.
  getSheetById(
    id: string,
    maxRows?: number
  ): Sheet | undefined {
    // TODO: use the `selectSheet` prepared stmt to
    //       query for the sheet by id
    //
    const sheet: Sheet | undefined =
      undefined; // <- replace with your code

    if (!sheet) return undefined;

    // TODO: use the `selectColumns` prepared stmt
    //       to get all the column names for this sheet,
    //       in order.
    //
    const columns: { name: string }[] =
      []; // <- replace with your code


    const { rows } = this.getCellsInRange(id, 0, maxRows) || {};

    return {
      ...( sheet as Sheet ),
      columns: columns.map((c: {name: string}) => c.name),
      cells: rows || []
    }
  }

  // Return rows of data, starting at `startRow`, and
  // including at last `maxRows`
  getCellsInRange(
    id: string,
    startRow: number = 0,
    maxRows?: number
  ): MoreRows | undefined {
    // TODO: use the `selectSheet` prepared stmt to
    //       query for the sheet by id
    //
    const sheet: Sheet | undefined =
      undefined; // <- replace with your code

    if (!sheet) return undefined;

    // TODO: get the number of columns in the sheet
    //       using the `countColumns` prepared statement
    const { ncolumns } =
      { ncolumns: 0 }; // <- replace with your code

    const end = typeof maxRows === "undefined"
      ? ( sheet as Sheet ).nrows
      : Math.min( ( sheet as Sheet ).nrows, startRow + maxRows)
    const rows: Value[][] = Array.from(
      { length: end - startRow },
      () => Array.from({ length: ncolumns }, () => new IntrinsicValue())
    );

    // TODO: get all the values from `startRow` up to
    //       (but not including) `end`. Use the `selectValues`
    //       query you prepared above
    const values : any[] = 
      [];  // <- replace with your code

    values.forEach(({ row, column, strval, numval }) => {
      const v = typeof strval === "string" ? strval :
        typeof numval === "number" ? numval : null;
      if (v !== null) {
        rows[row - startRow][column] = new IntrinsicValue(v);
      }
    })

    return { rows, start: startRow, count: end - startRow }
  }

  // Modify values in sheet, as indicated in the `patch`
  updateSheetValues(
    id: string,
    patch: Sparse<Value>
  ): Sparse<Value> | undefined {
    Object.entries(patch).forEach(([key, value]) => {
      const ref = parseKey(key as RCKey);
      const strval = !value.isNumber() ? value.toString() : null;
      const numval = value.isNumber() ? value.toNumber() : null;

      // TODO: run the `updateValue` prepared stmt
      //       to insert or update the cell value at
      //       ref.row and ref.column. Use the converted
      //       values `strval` and `numval` above

    });

    return patch;
  }
}
