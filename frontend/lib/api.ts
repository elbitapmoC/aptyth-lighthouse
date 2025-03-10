import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"; // Replace with your Deno backend URL

/**
 * API client for interacting with the Deno backend.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Logs in a user and retrieves a JWT token.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise resolving to the JWT token.
 */
export async function login(email: string, password: string): Promise<string> {
  try {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data.token;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Invalid email or password.");
  }
}

/**
 * Registers a new user.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise resolving to the new user's ID.
 */
export async function register(email: string, password: string): Promise<number> {
  try {
    const response = await apiClient.put("/auth/register", { email, password });
    return response.data.id;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("User registration failed.");
  }
}

export default apiClient;