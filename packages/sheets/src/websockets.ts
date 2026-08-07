import { WebSocket, WebSocketServer } from "ws";
import {
  IncomingMessage,
  Server,
} from "http";
import { Request } from "express";

export interface Connection {
  channel: string;
  socket: WebSocket;
}

export type HandlerFunction<CM> =
  (message: CM, source: Connection, peers: Connection[]) => void

export function sendMessage<SM extends object>(
  msg: SM, ...clients: Connection[]
) {
  clients.map((conn) => conn.socket)
    .forEach((wsc) => wsc.send(JSON.stringify(msg)));
}

export default function websockets<CM extends object>(
  expressServer: Server,
  handler: HandlerFunction<CM>
) {
  const wss = new WebSocketServer({
    noServer: true,
    path: "/ws"
  });

  const connections: Connection[] = [];
  const channels: { [sheetId: string]: Connection[] } = {};

  const addConnection = (sheetId: string, socket: WebSocket) => {
    const connection = { channel: sheetId, socket };
    connections.push(connection);
    if (sheetId in channels)
      channels[sheetId].push(connection);
    else
      channels[sheetId] = [connection];
  }

  expressServer.on(
    "upgrade",
    (request: IncomingMessage, socket, head) => {
      const url = request.url || "";
      const matches = url.match(/.*\?channel=([\w_-]+)/);
      const channel = matches ? matches[1] : "global";

      console.log("Got an upgrade request on channel", channel);
      wss.handleUpgrade(request, socket, head,
        (websocket: WebSocket) => {
          addConnection(channel, websocket);
          wss.emit("connection", websocket, request);
      });
    }
  );

  wss.on("connection", (wsc: WebSocket) => {
    //connection is up, let's add a simple simple event
    wsc.on("message", (message: Buffer) => {
      const conn = connections.find((c) => c.socket === wsc);

      if ( conn ) {
        const { channel, } = conn || {};
        const peers = channel
          ? channels[channel].filter((c) => c !== conn)
          : [];
        handler(JSON.parse(message.toString()) as CM, conn, peers )
      };
    });
  });

  return wss;
}
