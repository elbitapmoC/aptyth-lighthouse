import { WebSocketServer } from "https://deno.land/x/websocket_server/mod.ts";

interface Client {
  id: string;
  socket: WebSocket;
}

const clients = new Map<string, Client>();

/**
 * Broadcasts a message to all connected clients.
 * @param message - The message to broadcast.
 */
function broadcast(message: string) {
  for (const client of clients.values()) {
    client.socket.send(message);
  }
}

/**
 * Handles new WebSocket connections.
 * @param socket - The WebSocket connection.
 */
function handleConnection(socket: WebSocket) {
  const clientId = crypto.randomUUID();
  const client: Client = { id: clientId, socket };
  clients.set(clientId, client);

  console.log(`Client connected: ${clientId}`);

  socket.onmessage = (event) => {
    console.log(`Message from ${clientId}: ${event.data}`);
    broadcast(event.data);
  };

  socket.onclose = () => {
    console.log(`Client disconnected: ${clientId}`);
    clients.delete(clientId);
  };

  socket.onerror = (error) => {
    console.error(`Error on client ${clientId}:`, error);
    clients.delete(clientId);
  };
}

/**
 * Starts the WebSocket server.
 * @param port - The port to listen on.
 */
export function startWebSocketServer(port: number) {
  const server = new WebSocketServer(port);

  server.on("connection", (socket) => {
    handleConnection(socket);
  });

  console.log(`WebSocket server is running on ws://localhost:${port}`);
}
