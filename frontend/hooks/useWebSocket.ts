import { useState, useEffect, useRef } from "react";

/**
 * Custom React hook for managing WebSocket connections to the Deno backend.
 * @param url - The WebSocket server URL.
 * @returns An object containing WebSocket state and utility functions.
 */
export default function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  /**
   * Sends a message through the WebSocket connection.
   * @param message - The message to send.
   */
  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  /**
   * Closes the WebSocket connection.
   */
  const closeConnection = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  useEffect(() => {
    const socket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL || url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      setError(null);
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket encountered an error.");
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return {
    isConnected,
    messages,
    error,
    sendMessage,
    closeConnection,
  };
}