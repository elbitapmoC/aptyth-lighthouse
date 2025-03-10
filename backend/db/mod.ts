import { Pool } from "https://deno.land/x/postgres/mod.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL") || "";

// Ensure the DATABASE_URL is provided
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Create a new PostgreSQL connection pool
const dbPool = new Pool(DATABASE_URL, 10); // Pool size set to 10 connections

/**
 * Connects to the database.
 */
export async function connect() {
  try {
    const client = await dbPool.connect();
    console.log("Connected to the database.");
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

/**
 * Disconnects from the database.
 */
export async function disconnect() {
  try {
    await dbPool.end();
    console.log("Disconnected from the database.");
  } catch (error) {
    console.error("Failed to disconnect from the database:", error);
    throw error;
  }
}

/**
 * Executes a query on the database.
 * @param query - The SQL query string.
 * @param params - The parameters for the query.
 * @returns The query result.
 */
export async function query(query: string, params: unknown[] = []) {
  const client = await dbPool.connect();
  try {
    const result = await client.queryObject(query, ...params);
    return result;
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  } finally {
    client.release(); // Ensure the client is released back to the pool
  }
}

export default {
  connect,
  disconnect,
  query,
};