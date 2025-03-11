import { logger } from "../utils/logger.ts";
// backend/websockets/handlers.ts
import { addConnection } from "./connectionManager.ts";

export function handleConnection(socket: WebSocket, userId: string) {
  addConnection(userId, socket);

  logger.info(`New WebSocket connection: ${userId}`);

  socket.onmessage = (event) => {
    // Handle incoming messages
    logger.info(`Received message from ${userId}: ${event.data}`);
    // ... process the message ...
    // ... send responses (using connectionManager) ...

    // Echo back the message (for this simple example)
    socket.send(`Echo: ${event.data}`);
  };

  socket.onclose = () => {
    logger.info(`WebSocket connection closed: ${userId}`);
    // removeConnection is called in addConnection
  };

  socket.onerror = (error) => {
    logger.error(`WebSocket error: ${userId}`, error);
  };
}
