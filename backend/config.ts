import { config as loadEnv } from "https://deno.land/std/dotenv/mod.ts";

// Load environment variables from a .env file if it exists
await loadEnv({ export: true });

const config = {
  server: {
    port: parseInt(Deno.env.get("PORT") || "8000", 10),
  },
  database: {
    url: Deno.env.get("DATABASE_URL") || "",
  },
  jwt: {
    secret: Deno.env.get("JWT_SECRET") || "",
  },
};

if (!config.database.url) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

if (!config.jwt.secret) {
  throw new Error("JWT_SECRET is not set in the environment variables.");
}

export default config;
