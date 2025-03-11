// backend/websockets/connectionManager.ts
import { z } from "../deps.ts";

// Define the WebSocket Connection
const WebSockerUserSchema = z.object({
  userId: z.string(),
  socket: z.any(), // Use 'any' or 'WebSocket' - Deno's WebSocket type
});
type WebSocketUser = z.infer<typeof WebSockerUserSchema>;

const connections = new Map<string, WebSocketUser>(); // Use a Map

export function addConnection(userId: string, socket: WebSocket) {
  const userConnection = WebSockerUserSchema.parse({ userId, socket });
  connections.set(userId, userConnection);
  socket.addEventListener("close", () => {
    removeConnection(userId);
  });
}

export function removeConnection(userId: string) {
  connections.delete(userId);
}

export function getConnection(userId: string) {
  return connections.get(userId);
}

export function getAllConnections() {
  return Array.from(connections.values()); // Return as array
}

// Add functions for sending messages to specific users or groups
export function sendMessageToUser(userId: string, message: string) {
  const connection = getConnection(userId);
  if (connection?.socket.readyState === WebSocket.OPEN) {
    connection.socket.send(message);
  }
}

// Add broadcast for groups.
export function broadcast(message: string) {
  for (const connection of connections.values()) {
    if (connection.socket.readyState === WebSocket.OPEN) {
      connection.socket.send(message);
    }
  }
}
