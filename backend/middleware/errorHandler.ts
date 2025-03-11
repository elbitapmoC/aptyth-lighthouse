// backend/middleware/errorHandler.ts

import { type Context, Next } from "../deps.ts";
import { logger } from "../utils/logger.ts";
import { error } from "../utils/response.ts";

export const errorHandler = async (err: Error, c: Context) => {
  logger.error(err); // Log the error

  if (err instanceof SyntaxError) {
    //Check if error is SyntaxError
    return error(c, "Invalid JSON payload", err, 400);
  }

  // Handle other specific error types if needed

  return error(c, "Internal Server error", err); // Generic error response
};
