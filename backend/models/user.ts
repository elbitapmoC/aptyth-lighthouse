// backend/models/user.ts
import { z } from "../deps.ts";

// Zod schema for User
const UserSchema = z.object({
  id: z.string().uuid(), // Assuming UUID for user IDs
  email: z.string().email(),
  password: z.string(), // Store *hashed* passwords! (matches password_hash in DB)
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Infer the TypeScript type from the Zod schema
type User = z.infer<typeof UserSchema>;

export { UserSchema, type User };
