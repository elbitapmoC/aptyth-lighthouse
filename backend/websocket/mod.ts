import { WebSocketServer } from "https://deno.land/x/websocket/mod.ts";

const PORT = 8080; // Default WebSocket server port

// Create a WebSocket server
const wss = new WebSocketServer(PORT);

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New WebSocket connection established.");

  // Handle incoming messages
  ws.on("message", (message: string) => {
    console.log("Received message:", message);

    // Use the handleMessage function to process incoming messages
    handleMessage(ws, message);
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed.");
    handleClose(ws);
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    handleError(ws, error);
  });
});

import { handleMessage, handleClose, handleError } from "./handlers.ts";

export default wss;