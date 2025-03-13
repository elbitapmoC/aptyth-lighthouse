// backend/websockets/connectionManager.ts
import { z } from "../deps.ts";
import { logger } from "../utils/logger.ts";
import {
  ErrorMessageSchema,
  type PingMessageSchema,
  PongMessageSchema,
  type SubscribeMessageSchema,
  type UnsubscribeMessageSchema,
  type WebSocketMessage,
  WebSocketMessageSchema,
  WebSocketMessageType,
} from "./types.ts";

/**
 * Schema for a WebSocket user connection
 */
const WebSocketUserSchema = z.object({
  userId: z.string(),
  socket: z.any(), // Use 'any' for Deno's WebSocket type
  subscriptions: z.array(z.string()).default([]),
  lastActivity: z.number().default(() => Date.now()),
});

/**
 * Type for a WebSocket user connection
 */
type WebSocketUser = z.infer<typeof WebSocketUserSchema>;

/**
 * Map of user IDs to WebSocket connections
 */
const connections = new Map<string, WebSocketUser>();

/**
 * Map of channel names to sets of user IDs
 */
const channels = new Map<string, Set<string>>();

/**
 * Adds a new WebSocket connection for a user
 * @param userId - The user ID
 * @param socket - The WebSocket connection
 */
export function addConnection(userId: string, socket: WebSocket): void {
  const userConnection = WebSocketUserSchema.parse({
    userId,
    socket,
    subscriptions: [],
    lastActivity: Date.now(),
  });

  connections.set(userId, userConnection);

  // Set up message handler
  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      handleMessage(userId, data);
    } catch (error) {
      logger.error({ error, userId }, "Invalid WebSocket message");
      sendErrorMessage(userId, "INVALID_FORMAT", "Invalid message format");
    }
  });

  // Set up close handler
  socket.addEventListener("close", () => {
    handleDisconnect(userId);
  });

  // Set up error handler
  socket.addEventListener("error", (error) => {
    logger.error({ error, userId }, "WebSocket error");
    handleDisconnect(userId);
  });

  // Send a welcome message
  sendMessageToUser(userId, {
    type: WebSocketMessageType.CONNECT,
    timestamp: Date.now(),
  });

  logger.debug({ userId }, "New WebSocket connection established");
}

/**
 * Removes a WebSocket connection for a user
 * @param userId - The user ID
 */
export function removeConnection(userId: string): void {
  const connection = connections.get(userId);

  if (connection) {
    // Remove user from all subscribed channels
    for (const channelName of connection.subscriptions) {
      const channelUsers = channels.get(channelName);
      if (channelUsers) {
        channelUsers.delete(userId);

        // Clean up empty channels
        if (channelUsers.size === 0) {
          channels.delete(channelName);
        }
      }
    }

    // Close the socket if it's still open
    if (connection.socket.readyState === WebSocket.OPEN) {
      try {
        connection.socket.close();
      } catch (error) {
        logger.error({ error, userId }, "Error closing WebSocket");
      }
    }

    // Remove the connection
    connections.delete(userId);
  }
}

/**
 * Gets a WebSocket connection for a user
 * @param userId - The user ID
 * @returns The WebSocket connection or undefined if not found
 */
export function getConnection(userId: string): WebSocketUser | undefined {
  return connections.get(userId);
}

/**
 * Gets all WebSocket connections
 * @returns An array of all WebSocket connections
 */
export function getAllConnections(): WebSocketUser[] {
  return Array.from(connections.values());
}

/**
 * Sends a message to a specific user
 * @param userId - The user ID
 * @param message - The message to send
 * @returns True if the message was sent, false otherwise
 */
export function sendMessageToUser(
  userId: string,
  message: WebSocketMessage | Record<string, unknown>
): boolean {
  const connection = getConnection(userId);

  if (connection && connection.socket.readyState === WebSocket.OPEN) {
    try {
      connection.socket.send(JSON.stringify(message));
      connection.lastActivity = Date.now();
      return true;
    } catch (error) {
      logger.error({ error, userId }, "Error sending WebSocket message");
      return false;
    }
  }

  return false;
}

/**
 * Sends an error message to a specific user
 * @param userId - The user ID
 * @param code - The error code
 * @param message - The error message
 * @returns True if the message was sent, false otherwise
 */
export function sendErrorMessage(
  userId: string,
  code: string,
  message: string
): boolean {
  const errorMessage = ErrorMessageSchema.parse({
    type: WebSocketMessageType.ERROR,
    timestamp: Date.now(),
    error: {
      code,
      message,
    },
  });

  return sendMessageToUser(userId, errorMessage);
}

/**
 * Broadcasts a message to all connected users
 * @param message - The message to broadcast
 * @returns The number of users the message was sent to
 */
export function broadcast(
  message: WebSocketMessage | Record<string, unknown>
): number {
  let sentCount = 0;

  for (const [userId, connection] of connections.entries()) {
    if (sendMessageToUser(userId, message)) {
      sentCount++;
    }
  }

  return sentCount;
}

/**
 * Broadcasts a message to all users subscribed to a channel
 * @param channelName - The channel name
 * @param message - The message to broadcast
 * @returns The number of users the message was sent to
 */
export function broadcastToChannel(
  channelName: string,
  message: WebSocketMessage | Record<string, unknown>
): number {
  const channelUsers = channels.get(channelName);

  if (!channelUsers) {
    return 0;
  }

  let sentCount = 0;

  for (const userId of channelUsers) {
    if (sendMessageToUser(userId, message)) {
      sentCount++;
    }
  }

  return sentCount;
}

/**
 * Subscribes a user to a channel
 * @param userId - The user ID
 * @param channelName - The channel name
 * @returns True if the user was subscribed, false otherwise
 */
export function subscribeToChannel(
  userId: string,
  channelName: string
): boolean {
  const connection = connections.get(userId);

  if (!connection) {
    return false;
  }

  // Add the channel to the user's subscriptions
  if (!connection.subscriptions.includes(channelName)) {
    connection.subscriptions.push(channelName);
  }

  // Add the user to the channel
  let channelUsers = channels.get(channelName);

  if (!channelUsers) {
    channelUsers = new Set<string>();
    channels.set(channelName, channelUsers);
  }

  channelUsers.add(userId);

  return true;
}

/**
 * Unsubscribes a user from a channel
 * @param userId - The user ID
 * @param channelName - The channel name
 * @returns True if the user was unsubscribed, false otherwise
 */
export function unsubscribeFromChannel(
  userId: string,
  channelName: string
): boolean {
  const connection = connections.get(userId);

  if (!connection) {
    return false;
  }

  // Remove the channel from the user's subscriptions
  connection.subscriptions = connection.subscriptions.filter(
    (channel: string) => channel !== channelName
  );

  // Remove the user from the channel
  const channelUsers = channels.get(channelName);

  if (channelUsers) {
    channelUsers.delete(userId);

    // Clean up empty channels
    if (channelUsers.size === 0) {
      channels.delete(channelName);
    }
  }

  return true;
}

/**
 * Handles a WebSocket message
 * @param userId - The user ID
 * @param data - The message data
 */
function handleMessage(userId: string, data: unknown): void {
  try {
    // Validate the message
    const result = WebSocketMessageSchema.safeParse(data);

    if (!result.success) {
      logger.debug(
        { userId, error: result.error },
        "Invalid WebSocket message format"
      );
      sendErrorMessage(userId, "INVALID_FORMAT", "Invalid message format");
      return;
    }

    const message = result.data;

    // Update last activity timestamp
    const connection = connections.get(userId);
    if (connection) {
      connection.lastActivity = Date.now();
    }

    // Handle message based on type
    switch (message.type) {
      case WebSocketMessageType.PING:
        handlePing(userId, message);
        break;

      case WebSocketMessageType.SUBSCRIBE:
        handleSubscribe(userId, message);
        break;

      case WebSocketMessageType.UNSUBSCRIBE:
        handleUnsubscribe(userId, message);
        break;

      case WebSocketMessageType.MESSAGE:
        // Handle custom messages (could be extended)
        logger.debug({ userId, message }, "Custom message received");
        break;

      default:
        logger.debug({ userId, type: message.type }, "Unhandled message type");
    }
  } catch (error) {
    logger.error({ error, userId }, "Error handling WebSocket message");
    sendErrorMessage(userId, "SERVER_ERROR", "Internal server error");
  }
}

/**
 * Handles a ping message
 * @param userId - The user ID
 * @param message - The ping message
 */
function handlePing(
  userId: string,
  message: z.infer<typeof PingMessageSchema>
): void {
  // Respond with a pong message
  const pongMessage = PongMessageSchema.parse({
    type: WebSocketMessageType.PONG,
    id: message.id, // Echo back the message ID if provided
    timestamp: Date.now(),
  });

  sendMessageToUser(userId, pongMessage);
}

/**
 * Handles a subscribe message
 * @param userId - The user ID
 * @param message - The subscribe message
 */
function handleSubscribe(
  userId: string,
  message: z.infer<typeof SubscribeMessageSchema>
): void {
  const success = subscribeToChannel(userId, message.channel);

  if (success) {
    logger.debug(
      { userId, channel: message.channel },
      "User subscribed to channel"
    );
  } else {
    sendErrorMessage(
      userId,
      "SUBSCRIPTION_FAILED",
      "Failed to subscribe to channel"
    );
  }
}

/**
 * Handles an unsubscribe message
 * @param userId - The user ID
 * @param message - The unsubscribe message
 */
function handleUnsubscribe(
  userId: string,
  message: z.infer<typeof UnsubscribeMessageSchema>
): void {
  const success = unsubscribeFromChannel(userId, message.channel);

  if (success) {
    logger.debug(
      { userId, channel: message.channel },
      "User unsubscribed from channel"
    );
  } else {
    sendErrorMessage(
      userId,
      "UNSUBSCRIPTION_FAILED",
      "Failed to unsubscribe from channel"
    );
  }
}

/**
 * Handles a user disconnection
 * @param userId - The user ID
 */
function handleDisconnect(userId: string): void {
  removeConnection(userId);
  logger.debug({ userId }, "WebSocket connection closed");
}

/**
 * Exports the connection manager functions
 */
export const connectionManager = {
  addConnection,
  removeConnection,
  getConnection,
  getAllConnections,
  sendMessageToUser,
  sendErrorMessage,
  broadcast,
  broadcastToChannel,
  subscribeToChannel,
  unsubscribeFromChannel,
};
