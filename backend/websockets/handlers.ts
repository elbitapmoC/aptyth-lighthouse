// backend/websockets/handlers.ts
import { logger } from "../utils/logger.ts";
import { connectionManager } from "./connectionManager.ts";
import { WebSocketMessageType } from "./types.ts";

/**
 * Handles a new WebSocket connection
 * @param socket - The WebSocket connection
 * @param userId - The user ID
 */
export function handleConnection(socket: WebSocket, userId: string): void {
  // Add the connection to the connection manager
  connectionManager.addConnection(userId, socket);

  logger.info({ userId }, "New WebSocket connection established");

  // Send a welcome notification
  connectionManager.sendMessageToUser(userId, {
    type: WebSocketMessageType.NOTIFICATION,
    title: "Connected",
    body: "You are now connected to the Lighthouse Bible Platform",
    timestamp: Date.now(),
  });
}

/**
 * Sends a notification to a specific user
 * @param userId - The user ID
 * @param title - The notification title
 * @param body - The notification body
 * @param data - Optional additional data
 * @returns True if the notification was sent, false otherwise
 */
export function sendNotification(
  userId: string,
  title: string,
  body: string,
  data?: Record<string, unknown>
): boolean {
  return connectionManager.sendMessageToUser(userId, {
    type: WebSocketMessageType.NOTIFICATION,
    title,
    body,
    data,
    timestamp: Date.now(),
  });
}

/**
 * Broadcasts a notification to all connected users
 * @param title - The notification title
 * @param body - The notification body
 * @param data - Optional additional data
 * @returns The number of users the notification was sent to
 */
export function broadcastNotification(
  title: string,
  body: string,
  data?: Record<string, unknown>
): number {
  return connectionManager.broadcast({
    type: WebSocketMessageType.NOTIFICATION,
    title,
    body,
    data,
    timestamp: Date.now(),
  });
}

/**
 * Broadcasts a notification to all users subscribed to a channel
 * @param channelName - The channel name
 * @param title - The notification title
 * @param body - The notification body
 * @param data - Optional additional data
 * @returns The number of users the notification was sent to
 */
export function broadcastNotificationToChannel(
  channelName: string,
  title: string,
  body: string,
  data?: Record<string, unknown>
): number {
  return connectionManager.broadcastToChannel(channelName, {
    type: WebSocketMessageType.NOTIFICATION,
    title,
    body,
    data,
    timestamp: Date.now(),
  });
}
