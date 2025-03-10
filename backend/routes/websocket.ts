import { Router, WebSocket, WebSocketEvent } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

/**
 * WebSocket route to handle real-time communication.
 * This route establishes a WebSocket connection and handles incoming messages.
 */
router.get("/websocket", (ctx) => {
  if (!ctx.isUpgradable) {
    ctx.throw(400, "WebSocket connection is not upgradable.");
  }

  const socket = ctx.upgrade();

  socket.onopen = () => {
    console.log("WebSocket connection established.");
    socket.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
  };

  socket.onmessage = (event: WebSocketEvent) => {
    if (typeof event.data === "string") {
      console.log("Received message:", event.data);

      // Echo the received message back to the client
      socket.send(JSON.stringify({ message: `Echo: ${event.data}` }));
    }
  };

  socket.onerror = (event) => {
    console.error("WebSocket error:", event);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed.");
  };
});

export default router;
