import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"; // Replace with your Deno backend URL

/**
 * API client for interacting with the Deno backend.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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

/**
 * Fetches Bible content from the Deno backend.
 * @param book - The name of the book in the Bible.
 * @param chapter - The chapter number.
 * @returns A promise resolving to the Bible content for the specified book and chapter.
 */
export async function fetchBibleContent(book: string, chapter: number): Promise<any> {
  try {
    const response = await apiClient.get(`/bible?book=${encodeURIComponent(book)}&chapter=${chapter}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Bible content:", error);
    throw new Error("Unable to fetch Bible content.");
  }
}

/**
 * React Query hook for fetching Bible content.
 * @param book - The name of the book in the Bible.
 * @param chapter - The chapter number.
 */
export function useBibleContent(book: string, chapter: number) {
  return useQuery(["bibleContent", book, chapter], () => fetchBibleContent(book, chapter));
}

/**
 * React Query hook for user login.
 */
export function useLogin() {
  return useMutation(({ email, password }: { email: string; password: string }) =>
    login(email, password)
  );
}

/**
 * React Query hook for user registration.
 */
export function useRegister() {
  return useMutation(({ email, password }: { email: string; password: string }) =>
    register(email, password)
  );
}

export default apiClient;