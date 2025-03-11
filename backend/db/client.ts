// backend/db/client.ts
import { Pool } from "../deps.ts";
import "dotenv/load.ts";

// Get the database connection string from environment variables
const databaseUrl = Deno.env.get("DATABASE_URL");
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable not set");
}

// Create a connection pool
const pool = new Pool(databaseUrl, 3, true);

export { pool };
