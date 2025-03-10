import "https://deno.land/std@0.203.0/dotenv/load.ts";

/**
 * Centralized configuration module to manage environment variables and application settings.
 * This module ensures that all required environment variables are loaded and provides
 * default values where applicable.
 */

// Retrieve environment variables with optional default values
const getEnv = (key: string, defaultValue?: string): string => {
  const value = Deno.env.get(key);
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
};

// Application configuration
const config = {
  database: {
    url: getEnv("DATABASE_URL"),
  },
  server: {
    port: parseInt(getEnv("PORT", "8000"), 10),
  },
  jwt: {
    secret: getEnv("JWT_SECRET"),
  },
};

export default config;
