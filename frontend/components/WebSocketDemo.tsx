import React, { useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import { Button } from "@/components/ui/button";

export default function WebSocketDemo() {
  const { messages, sendMessage, isConnected } = useWebSocket(
    "ws://localhost:8080"
  );
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center mb-4">
        WebSocket Demo
      </h2>
      <p className="text-sm text-center mb-4">
        Connection Status:{" "}
        <span
          className={`font-medium ${
            isConnected ? "text-green-500" : "text-red-500"
          }`}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </p>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border rounded-md"
        />
        <Button
          onClick={handleSendMessage}
          variant="default"
          size="default"
          disabled={!isConnected || inputMessage.trim() === ""}
        >
          Send
        </Button>
      </div>
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Messages:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <li key={index} className="text-gray-700">
                {msg}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No messages yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
