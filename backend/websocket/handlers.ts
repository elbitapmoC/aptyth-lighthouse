import { WebSocket } from "https://deno.land/x/websocket/mod.ts";

/**
 * Handles incoming WebSocket messages and performs actions based on message type.
 * @param ws - The WebSocket connection.
 * @param message - The received message.
 */
function handleMessage(ws: WebSocket, message: string) {
  try {
    const parsedMessage = JSON.parse(message);

    if (!parsedMessage.type || !parsedMessage.payload) {
      throw new Error("Invalid message format. 'type' and 'payload' are required.");
    }

    switch (parsedMessage.type) {
      case "ping":
        ws.send(JSON.stringify({ type: "pong", payload: "Pong response from server" }));
        break;

      case "broadcast":
        broadcastMessage(ws, parsedMessage.payload);
        break;

      case "echo":
        ws.send(JSON.stringify({ type: "echo", payload: parsedMessage.payload }));
        break;

      default:
        ws.send(JSON.stringify({ type: "error", payload: "Unknown message type" }));
        break;
    }
  } catch (error) {
    console.error("Error handling message:", error);
    ws.send(JSON.stringify({ type: "error", payload: error.message }));
  }
}

/**
 * Broadcasts a message to all connected WebSocket clients except the sender.
 * @param sender - The WebSocket connection of the sender.
 * @param payload - The message payload to broadcast.
 */
function broadcastMessage(sender: WebSocket, payload: string) {
  for (const client of WebSocket.clients) {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "broadcast", payload }));
    }
  }
}

/**
 * Handles WebSocket connection close events.
 * @param ws - The WebSocket connection.
 */
function handleClose(ws: WebSocket) {
  console.log("WebSocket connection closed.");
}

/**
 * Handles WebSocket errors.
 * @param ws - The WebSocket connection.
 * @param error - The error object.
 */
function handleError(ws: WebSocket, error: Error) {
  console.error("WebSocket error:", error);
}

export { handleMessage, handleClose, handleError, broadcastMessage };
