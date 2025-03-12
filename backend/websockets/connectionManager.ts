// backend/websockets/connectionManager.ts
import { z } from "../deps.ts";
import { logger } from "../utils/logger.ts";

// Define the WebSocket Connection
const WebSocketUserSchema = z.object({
  userId: z.string(),
  socket: z.any(), // Use 'any' for Deno's WebSocket type
});

type WebSocketUser = z.infer<typeof WebSocketUserSchema>;

const connections = new Map<string, WebSocketUser>();

export function addConnection(userId: string, socket: WebSocket) {
  const userConnection = WebSocketUserSchema.parse({ userId, socket });
  connections.set(userId, userConnection);

  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      // Handle message
      logger.debug({ userId, type: data.type }, "WebSocket message received");
    } catch (error) {
      logger.error({ error, userId }, "Invalid WebSocket message");
      socket.send(
        JSON.stringify({
          type: "error",
          message: "Invalid message format",
        })
      );
    }
  });

  socket.addEventListener("close", () => {
    removeConnection(userId);
    logger.debug({ userId }, "WebSocket connection closed");
  });

  socket.addEventListener("error", (error) => {
    logger.error({ error, userId }, "WebSocket error");
    removeConnection(userId);
  });

  logger.debug({ userId }, "New WebSocket connection established");
}

export function removeConnection(userId: string) {
  connections.delete(userId);
}

export function getConnection(userId: string) {
  return connections.get(userId);
}

export function getAllConnections() {
  return Array.from(connections.values());
}

export function sendMessageToUser(userId: string, message: string) {
  const connection = getConnection(userId);
  if (connection && connection.socket.readyState === WebSocket.OPEN) {
    connection.socket.send(message);
    return true;
  }
  return false;
}

export function broadcast(message: string) {
  let sentCount = 0;
  for (const connection of connections.values()) {
    if (connection.socket.readyState === WebSocket.OPEN) {
      connection.socket.send(message);
      sentCount++;
    }
  }
  return sentCount;
}

export const connectionManager = {
  addConnection,
  removeConnection,
  getConnection,
  getAllConnections,
  sendMessageToUser,
  broadcast,
};
