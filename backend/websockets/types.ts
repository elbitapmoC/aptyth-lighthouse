// backend/websockets/types.ts
import { z } from "../deps.ts";

/**
 * WebSocket message types
 */
export enum WebSocketMessageType {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  ERROR = "error",
  PING = "ping",
  PONG = "pong",
  SUBSCRIBE = "subscribe",
  UNSUBSCRIBE = "unsubscribe",
  MESSAGE = "message",
  NOTIFICATION = "notification",
}

/**
 * Base schema for all WebSocket messages
 */
export const BaseMessageSchema = z.object({
  type: z.nativeEnum(WebSocketMessageType),
  id: z.string().optional(), // Optional message ID for request/response correlation
  timestamp: z.number().default(() => Date.now()),
});

/**
 * Schema for error messages
 */
export const ErrorMessageSchema = BaseMessageSchema.extend({
  type: z.literal(WebSocketMessageType.ERROR),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

/**
 * Schema for ping messages
 */
export const PingMessageSchema = BaseMessageSchema.extend({
  type: z.literal(WebSocketMessageType.PING),
});

/**
 * Schema for pong messages
 */
export const PongMessageSchema = BaseMessageSchema.extend({
  type: z.literal(WebSocketMessageType.PONG),
});

/**
 * Schema for subscription messages
 */
export const SubscribeMessageSchema = BaseMessageSchema.extend({
  type: z.literal(WebSocketMessageType.SUBSCRIBE),
  channel: z.string(),
});

/**
 * Schema for unsubscription messages
 */
export const UnsubscribeMessageSchema = BaseMessageSchema.extend({
  type: z.literal(WebSocketMessageType.UNSUBSCRIBE),
  channel: z.string(),
});

/**
 * Schema for generic messages
 */
export const MessageSchema = BaseMessageSchema.extend({
  type: z.literal(WebSocketMessageType.MESSAGE),
  content: z.any(),
});

/**
 * Schema for notification messages
 */
export const NotificationSchema = BaseMessageSchema.extend({
  type: z.literal(WebSocketMessageType.NOTIFICATION),
  title: z.string(),
  body: z.string(),
  data: z.any().optional(),
});

/**
 * Union type for all WebSocket message schemas
 */
export const WebSocketMessageSchema = z.discriminatedUnion("type", [
  ErrorMessageSchema,
  PingMessageSchema,
  PongMessageSchema,
  SubscribeMessageSchema,
  UnsubscribeMessageSchema,
  MessageSchema,
  NotificationSchema,
]);

/**
 * Type for all WebSocket messages
 */
export type WebSocketMessage = z.infer<typeof WebSocketMessageSchema>;

/**
 * Type for error messages
 */
export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;

/**
 * Type for ping messages
 */
export type PingMessage = z.infer<typeof PingMessageSchema>;

/**
 * Type for pong messages
 */
export type PongMessage = z.infer<typeof PongMessageSchema>;

/**
 * Type for subscription messages
 */
export type SubscribeMessage = z.infer<typeof SubscribeMessageSchema>;

/**
 * Type for unsubscription messages
 */
export type UnsubscribeMessage = z.infer<typeof UnsubscribeMessageSchema>;

/**
 * Type for generic messages
 */
export type Message = z.infer<typeof MessageSchema>;

/**
 * Type for notification messages
 */
export type NotificationMessage = z.infer<typeof NotificationSchema>;
