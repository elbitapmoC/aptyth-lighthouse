// backend/utils/config.ts
import { config as loadEnv, z } from "../deps.ts";

// Load environment variables
await loadEnv({ export: true });

// Define a Zod schema for configuration
const configSchema = z.object({
  ENV: z.enum(["development", "production", "testing"]).default("development"),
  port: z.coerce.number().default(8000),
  databaseUrl: z.string().min(1),
  jwtSecret: z.string().min(1),
  jwtExpiryInMinutes: z.coerce.number().default(60),
});

// Cache the config
let cachedConfig: z.infer<typeof configSchema> | null = null;

// Get config, using cache if available
export async function getConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }

  const env = Deno.env.toObject();

  // Parse and validate environment variables
  const parsedConfig = configSchema.safeParse({
    ENV: env.DENO_ENV || env.ENV,
    port: env.PORT,
    databaseUrl: env.DATABASE_URL,
    jwtSecret: env.JWT_SECRET,
    jwtExpiryInMinutes: env.JWT_EXPIRY_MINUTES,
  });

  // Handle validation errors
  if (!parsedConfig.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      parsedConfig.error.format()
    );
    Deno.exit(1);
  }

  // Cache and return the validated config
  cachedConfig = parsedConfig.data;
  return cachedConfig;
}

// Export the config type
export type Config = z.infer<typeof configSchema>;
