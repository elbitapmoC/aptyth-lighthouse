import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import pg from "pg";
const { Pool } = pg;
import { config } from "../config.ts";
import { users } from "./schema/user.ts";

const schema = { users };

const pool = new Pool({
  connectionString: config.databaseUrl,
});

export const db = drizzle(pool, { schema });

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    return false;
  }
}
