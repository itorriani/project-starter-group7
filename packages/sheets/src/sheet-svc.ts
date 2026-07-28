import { Sheet, WithId } from "@poly-sheets/types";
import { v4 as uuidv4 } from "uuid";

let storedSheets: Map<string, WithId<Sheet>> = new Map();

function create(sheet: Sheet) : WithId<Sheet> {
  const id = uuidv4();
  const stored: WithId<Sheet> = {
    // TODO: initialize an object with everything from sheet
    //       plus an id: property
  };

  // TODO: add the `stored` object to the map with key `id`
  return stored;
}

function get(id: string): WithId<Sheet> | undefined {
  return // TODO: get the sheet from storedSheets
}

export default { create, get };
