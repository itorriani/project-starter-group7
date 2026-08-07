import type {
  AbsoluteReference,
  ClientMessage,
  RCKey,
  ServerMessage,
  Sheet,
  Sparse,
  Value
} from "@poly-sheets/types";
import { parseKey } from "@poly-sheets/types";
import { type Connection, createConnection, sendMessage } from "./websocket.ts";

export function wsSubscribeChanges(
  sheetId: string,
  sheet: Sheet,
  nrows: number,
  ws: Connection | undefined,
  setConnection: (ws: Connection) => void
) {
  // TODO: compose a `SUBSCRIBE_ROWS` message to send
  //       to the server:
  //
  // const message: ClientMessage = ...

  if (sheetId) {
    if (ws?.channel !== sheetId) {
      createConnection<ServerMessage>(
        sheetId,
        // TODO: write a function that will handle any message
        //       we expect to receive on this connection. Hint:
        //       there is a function defined below that you can
        //       use
        (msg: ServerMessage) => { /* your code here */ }
      ).then((conn) => {
        // TODO: use the `sendMessage` function (imported above)
        //       to send the `message` on the connection `ws

        // TODO: invoke the callback function `setConnection`
        //       so that the connection gets saved in App.svelte
      });
    } else {
      // TODO: use the `sendMessage` function (imported above)
      //       to send the `message` on the connection `ws`
    }
  }
}

export function wsHandleChange(
  event: Event,
  sheetId: string,
  sheet: Sheet,
  connection: Connection
) {
  // TODO: use the same code as in `handleChange`
  //
  // const input = ...

  // TODO: use the same code as in `handleChange`
  //
  //  const value = ...

  // TODO: use the same code as in `handleChange`
  //
  // const patch: Sparse<Value> = ...;

  // TODO: compose a `PATCH_CELL_DATA` message to send
  //       to the server:
  //
  // const message: ClientMessage = ...

  // TODO: send the message using sendMessage()
}

function wsHandleMessage(msg: ServerMessage, sheet: Sheet) {
  switch (msg[0]) {
    case "UPDATE_VALUES": {
      const patch: Sparse<Value> = msg[1];

      // Record types are easier to handle
      // as an array of entries. So we start by getting
      // the entries in the patch object
      const entries: [RCKey, Value][] =
        Object.entries(patch) as [RCKey, Value][];

      const triples: [number, number, Value][] = entries.map(
        // TODO: For each entry, replace the key with the `row`
        //       and `column` (both numbers) encoded in the key.
        //       (Hint: don't parse the key yourself; use `parseKey`
        //       from the library.) Rewrite the following
        //       function:
        (entry) => [0 /* row */, 0 /* column */, null /* value */]
      );

      triples.forEach(([row, column, value]) => {
        // TODO: set the corresponding entry in sheet.cells
      });
      break;
    }
    default:
      console.log("Invalid message type:", msg[0]);
  }
}
