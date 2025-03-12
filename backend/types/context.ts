// backend/types/context.ts
import type { Context } from "../deps.ts";
import type { Payload } from "../deps.ts"; // Import Payload

// Define an interface that extends the base Context
export interface CustomContext extends Context {
  get: (key: "user") => Payload; // Use the imported Payload type
}
