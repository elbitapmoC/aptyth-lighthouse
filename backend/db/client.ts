// backend/db/client.ts
import { Pool } from "../deps.ts";
import { config } from "../utils/config.ts"; // Import the config object

// Use the database URL from the config object
const pool = new Pool(config.databaseUrl, 3, true);

export { pool };
