// backend/types/context.ts
import type { Context } from "../deps.ts";
import type { JWTPayload } from "../utils/auth.ts"; // Import JWTPayload from auth.ts

// Define an interface that extends the base Context
export interface CustomContext extends Context {
  get: (key: "user") => JWTPayload; // Use the JWTPayload type
}
