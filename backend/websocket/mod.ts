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

    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed.");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

export default wss;
