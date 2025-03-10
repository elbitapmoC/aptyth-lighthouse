import { Client } from "https://deno.land/x/postgres/mod.ts";

const DATABASE_URL = Deno.env.get("DATABASE_URL") || "";

// Ensure the DATABASE_URL is provided
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

// Create a new PostgreSQL client
const dbClient = new Client(DATABASE_URL);

/**
 * Connects to the database.
 */
export async function connect() {
  try {
    await dbClient.connect();
    console.log("Connected to the database.");
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
    await dbClient.end();
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
  try {
    const result = await dbClient.queryObject(query, ...params);
    return result;
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
}

export default {
  connect,
  disconnect,
  query,
};
