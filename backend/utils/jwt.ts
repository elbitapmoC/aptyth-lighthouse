import { create, verify, Payload } from "https://deno.land/x/djwt/mod.ts";

const JWT_SECRET = Deno.env.get("JWT_SECRET") || "your_jwt_secret_key";

/**
 * Generates a JWT token.
 * @param payload - The payload to include in the token.
 * @param expiresIn - The expiration time for the token (e.g., "1h", "30m").
 * @returns The generated JWT token as a string.
 */
export async function generateToken(payload: Payload, expiresIn: string): Promise<string> {
  try {
    const header = { alg: "HS256", typ: "JWT" };
    const token = await create(header, { ...payload, exp: getExpirationTime(expiresIn) }, JWT_SECRET);
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("Failed to generate token.");
  }
}

/**
 * Verifies a JWT token.
 * @param token - The JWT token to verify.
 * @returns The decoded payload if the token is valid.
 * @throws An error if the token is invalid or expired.
 */
export async function verifyToken(token: string): Promise<Payload> {
  try {
    const payload = await verify(token, JWT_SECRET, "HS256");
    return payload;
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    throw new Error("Invalid or expired token.");
  }
}

/**
 * Calculates the expiration time for the token.
 * @param expiresIn - The expiration time as a string (e.g., "1h", "30m").
 * @returns The expiration time as a Unix timestamp.
 */
function getExpirationTime(expiresIn: string): number {
  const now = Math.floor(Date.now() / 1000);
  const match = expiresIn.match(/^(\d+)([smhd])$/);

  if (!match) {
    throw new Error("Invalid expiration format. Use 's', 'm', 'h', or 'd' (e.g., '1h', '30m').");
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return now + value;
    case "m":
      return now + value * 60;
    case "h":
      return now + value * 60 * 60;
    case "d":
      return now + value * 60 * 60 * 24;
    default:
      throw new Error("Invalid expiration unit. Use 's', 'm', 'h', or 'd'.");
  }
}

export default {
  generateToken,
  verifyToken,
};
