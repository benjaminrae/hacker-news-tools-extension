import {WebSocket, WebSocketServer} from "ws";

let socket: WebSocket;

if (process.env.NODE_ENV === "development") {
  socket = new WebSocketServer({port: 9000});
  socket.on('connection'
}
