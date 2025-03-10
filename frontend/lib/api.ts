import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your Deno backend URL

/**
 * API client for interacting with the Deno backend.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Set a timeout for requests
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
  } catch (error: any) {
    if (error.response) {
      console.error("Login failed:", error.response.data);
      throw new Error(error.response.data.error || "Invalid email or password.");
    } else {
      console.error("Login failed:", error.message);
      throw new Error("Network error occurred during login.");
    }
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
  } catch (error: any) {
    if (error.response) {
      console.error("Registration failed:", error.response.data);
      throw new Error(error.response.data.error || "User registration failed.");
    } else {
      console.error("Registration failed:", error.message);
      throw new Error("Network error occurred during registration.");
    }
  }
}

/**
 * Fetches Bible content from the Deno backend.
 * @param book - The name of the book in the Bible.
 * @param chapter - The chapter number.
 * @returns A promise resolving to the Bible content for the specified book and chapter.
 */
export async function fetchBibleContent(book: string, chapter: number): Promise<{ book: string; chapter: number; verses: { verse_number: number; text: string }[] }> {
  try {
    const response = await apiClient.get(`/bible?book=${encodeURIComponent(book)}&chapter=${chapter}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to fetch Bible content:", error.response.data);
      throw new Error(error.response.data.error || "Unable to fetch Bible content.");
    } else {
      console.error("Failed to fetch Bible content:", error.message);
      throw new Error("Network error occurred while fetching Bible content.");
    }
  }
}

/**
 * Sets the authentication token for the API client.
 * @param token - The JWT token to be set in the Authorization header.
 */
export function setAuthToken(token: string | null): void {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
}

export default apiClient;