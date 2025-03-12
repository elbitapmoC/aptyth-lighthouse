// backend/deps.ts
// Hono exports
export { Hono } from "npm:hono@4.0.8";
export type { Context } from "npm:hono@4.0.8";
export { HTTPException } from "npm:hono@4.0.8/http-exception";
export { cors, logger } from "npm:hono@4.0.8/middleware";

// Zod for validation
export { z } from "zod";

// bcryptjs for password hashing
export * as bcrypt from "bcryptjs";

// djwt for JWT handling
export { create, decode, verify } from "djwt";

// dotenv for environment variables
export { load } from "dotenv/mod.ts";

// postgres client
export { Pool, PoolClient } from "deno-postgres";

// Standard library exports
export { serve } from "std/http/server.ts";
export { join } from "std/path/mod.ts";
export { ensureDir } from "std/fs/ensure_dir.ts";
