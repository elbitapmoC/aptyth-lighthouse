import { pino, pinoPretty } from "../deps.ts";
// backend/utils/logger.ts
import { getConfig } from "./config.ts";

let logger: ReturnType<typeof pino>;

export async function setupLogger() {
  const config = await getConfig();
  const isDevelopment = config.ENV === "development";

  const options = isDevelopment
    ? {
        level: "debug",
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }
    : {
        level: "info",
      };

  logger = pino(options);

  logger.info(
    {
      env: config.ENV,
      timestamp: new Date().toISOString(),
    },
    "Logger initialized"
  );

  return logger;
}

// Export a default logger for imports before setup
logger = pino({ level: "info" });
export { logger };
