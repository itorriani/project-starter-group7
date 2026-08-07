import { ClientMessage, ServerMessage, Sparse, Value } from "@poly-sheets/types";
import { Connection, sendMessage } from "./websockets.ts";
import sheetSvc from "./sheet-svc.ts";

const subscribedRows: WeakMap<Connection, number> = new WeakMap();

function handler(msg: ClientMessage, source: Connection, peers: Connection[]) {

  switch (msg[0]) {
    case "PATCH_CELL_DATA": {
      const sheetId = source.channel;
      const patch = msg[1] as Sparse<Value>;

      // TODO: call the `patch` function in `sheetSvc`
      //       and save the result as `success`

      const success = false; // <-- replace with your code

      if (success) {
        // TODO: compose the message which the server will send
        //       to the client which sent the message, as well
        //       as any other clients subscribed to the same channel
        //
        // const message: ServerMessage = ...

        // TODO: send the message (uncomment this line)
        //
        // sendMessage<ServerMessage>(message, source, ...peers);
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

export default handler;
