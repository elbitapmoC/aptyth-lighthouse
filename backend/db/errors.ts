// backend/db/errors.ts

/**
 * Database error types for more specific error handling
 */
export enum DatabaseErrorType {
  CONNECTION_ERROR = "CONNECTION_ERROR",
  QUERY_ERROR = "QUERY_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
}

/**
 * Custom error class for database-related errors
 * Provides more context and specific error types for better error handling
 */
export class DatabaseError extends Error {
  /**
   * The type of database error
   */
  type: DatabaseErrorType;

  /**
   * The original error that caused this error (if any)
   */
  override cause?: unknown;

  /**
   * Creates a new DatabaseError
   * @param message - The error message
   * @param type - The type of database error
   * @param cause - The original error that caused this error (if any)
   */
  constructor(
    message: string,
    type: DatabaseErrorType = DatabaseErrorType.QUERY_ERROR,
    cause?: unknown
  ) {
    super(message);
    this.name = "DatabaseError";
    this.type = type;
    this.cause = cause;
  }
}
