import { WebSocket } from "https://deno.land/std/ws/mod.ts";

/**
 * Handles incoming WebSocket messages from clients.
 * @param clientId - The unique identifier of the client.
 * @param message - The message received from the client.
 */
async function handleMessage(clientId: string, message: string) {
  console.log(`Message received from client ${clientId}: ${message}`);

  // Example: Echo the message back to the client
  const response = `Echo from server: ${message}`;
  await broadcastMessage(response);
}

/**
 * Broadcasts a message to all connected clients.
 * @param message - The message to broadcast.
 */
async function broadcastMessage(message: string) {
  for (const [clientId, socket] of clients.entries()) {
    try {
      await socket.send(message);
    } catch (error) {
      console.error(`Failed to send message to client ${clientId}:`, error);
      clients.delete(clientId); // Remove disconnected clients
    }
  }
}

/**
 * Handles WebSocket connection closure.
 * @param clientId - The unique identifier of the client.
 */
function handleClose(clientId: string) {
  console.log(`Client disconnected: ${clientId}`);
  clients.delete(clientId);
}

/**
 * Handles WebSocket errors.
 * @param clientId - The unique identifier of the client.
 * @param error - The error encountered.
 */
function handleError(clientId: string, error: Error) {
  console.error(`Error on client ${clientId}:`, error);
  clients.delete(clientId);
}

/**
 * Registers a new WebSocket connection.
 * @param clientId - The unique identifier of the client.
 * @param socket - The WebSocket connection.
 */
function registerConnection(clientId: string, socket: WebSocket) {
  clients.set(clientId, socket);
  console.log(`Client connected: ${clientId}`);
}

// Map to store connected clients
const clients = new Map<string, WebSocket>();

export {
  handleMessage,
  broadcastMessage,
  handleClose,
  handleError,
  registerConnection,
};
