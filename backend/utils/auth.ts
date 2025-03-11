// backend/utils/auth.ts
import { compare, hash } from "../deps.ts";
import { Payload, create } from "../deps.ts";

// --- Password Hashing ---
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10); // Use a salt round of 10 (adjust as needed)
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}
