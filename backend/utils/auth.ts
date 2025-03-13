// backend/utils/auth.ts
import { SignJWT, compare, decodeJwt, hash, jwtVerify } from "../deps.ts";
import { getConfig } from "./config.ts";
import { logger } from "./logger.ts";

// Cache the config for performance
let configCache: { jwtSecret: string } | null = null;

/**
 * Gets the JWT secret from config
 * @returns The JWT secret
 */
async function getJwtSecret(): Promise<string> {
  if (!configCache) {
    const config = await getConfig();
    configCache = { jwtSecret: config.jwtSecret };
  }
  return configCache.jwtSecret;
}

/**
 * Hashes a password using bcrypt
 * @param password - The plain text password to hash
 * @returns A promise that resolves to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 10); // Use a salt round of 10 (adjust as needed)
}

/**
 * Compares a plain text password with a hash
 * @param password - The plain text password to compare
 * @param hash - The hashed password to compare against
 * @returns A promise that resolves to true if the password matches, false otherwise
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}

/**
 * Type definition for JWT payload
 */
export interface JWTPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

/**
 * Creates a JWT token for a user
 * @param userId - The user ID to include in the token
 * @param expiresIn - Optional expiration time in seconds (defaults to 1 hour)
 * @returns A promise that resolves to the JWT token
 */
export async function createJwt(
  userId: string,
  expiresIn = 60 * 60 // 1 hour default
): Promise<string> {
  const jwtSecret = await getJwtSecret();
  const secretKey = new TextEncoder().encode(jwtSecret);

  // Create a JWT with jose
  return await new SignJWT({ iss: "lighthouse-platform" })
    .setProtectedHeader({ alg: "HS512" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
    .sign(secretKey);
}

/**
 * Verifies a JWT token
 * @param token - The JWT token to verify
 * @returns A promise that resolves to the payload if valid, or throws an error if invalid
 */
export async function verifyJwt(token: string): Promise<JWTPayload> {
  try {
    const jwtSecret = await getJwtSecret();
    const secretKey = new TextEncoder().encode(jwtSecret);

    // Verify the token with jose
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    logger.error({ error }, "JWT verification failed");
    throw new Error("Invalid token");
  }
}
