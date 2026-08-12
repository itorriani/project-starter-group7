import { ClientMessage, SerializedValue, ServerMessage, Sparse, Value } from "@poly-sheets/types";
import { Connection, sendMessage } from "./websockets.ts";
import { SheetService } from "sheet-svc";

function createServer(svc: SheetService) {

  const subscribedRows: WeakMap<Connection, number> = new WeakMap();

  return function handler(msg: ClientMessage, source: Connection, peers: Connection[]) {
    const sheetId = source.channel;

    switch (msg[0]) {
      case "PATCH_CELL_DATA": {
        const patch = fromSerializedValues(msg[1]);

        // TODO: call the `patch` function in `sheetSvc`
        //       and save the result as `success`
        //
        const success = false; // <-- replace with your code

        if (success) {
          const patch = toSerializedValues(success);

          // TODO: compose an `UPDATE_VALUES` message, using
          //       `patch` as the payload object
          const message = []; // <- replace [] with your code

          sendMessage<ServerMessage>(message, source, ...peers);
        }
        break;
      }
      case "SUBSCRIBE_ROWS": {
        const nrows = msg[1];
        subscribedRows.set(source, nrows);
        break;
      }
      default:
        const invalidType: never = msg[0];
        console.log("Invalid message type:", invalidType);
    }
  }
}

function fromSerializedValues(serialized: Sparse<SerializedValue>): Sparse<Value> {
  const entries = Object.entries(serialized)
    .map(([key, json]) => [key, Value.fromJSON(json)]);
  return Object.fromEntries(entries);
}

function toSerializedValues(patch: Sparse<Value>): Sparse<SerializedValue> {
  const entries = Object.entries(patch)
    .map(([key, value]) => [key, value.toJSON()]);
  return Object.fromEntries(entries);
}

export default createServer;
