const WS_HOST = window.location.host;
const WS_PATH = "/ws";

export interface Connection {
  channel: string;
  socket: WebSocket;
}

export type Receiver<T> = (msg: T) => void;

export function createConnection<T>(
  channel: string,
  receiver: Receiver<T>
): Promise<Connection> {

  return new Promise((resolve, _) => {
    const socket = new WebSocket(
      `ws://${WS_HOST}${WS_PATH}?channel=${channel}`
    );

    socket.addEventListener("open", () => {
      console.log("Connected to server on channel ", channel);
      resolve({ channel, socket });
    });

    socket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
      const json = JSON.parse(event.data);
      receiver(json);
    });
  });
}

export function sendMessage<T>(
  connection: Connection,
  json: T
) {
  connection.socket.send(JSON.stringify(json));
}
