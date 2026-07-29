import { Sheet, WithId, newSheet } from "@poly-sheets/types";
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
  return // TODO: get the sheet from storedSheets
}

export default { create, get };
