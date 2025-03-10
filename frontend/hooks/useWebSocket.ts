import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for managing WebSocket connections.
 * @param url - The WebSocket server URL.
 * @returns An object containing the WebSocket state, sendMessage function, and connection status.
 */
export default function useWebSocket(url: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket(url);
    webSocketRef.current = ws;

    // Handle WebSocket open event
    ws.onopen = () => {
      console.log("WebSocket connection established.");
      setIsConnected(true);
    };

    // Handle incoming messages
    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Handle WebSocket close event
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      setIsConnected(false);
    };

    // Handle WebSocket error event
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, [url]);

  /**
   * Sends a message through the WebSocket connection.
   * @param message - The message to send.
   */
  const sendMessage = (message: string) => {
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      webSocketRef.current.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  return { messages, sendMessage, isConnected };
}
