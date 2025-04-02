import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your Deno backend URL

// Define interfaces for API responses
interface BibleContent {
  book: string;
  chapter: number;
  verses: {
    number: number;
    text: string;
  }[];
}

// Define types for mutation inputs
type LoginInput = { email: string; password: string };
type RegisterInput = { email: string; password: string };

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
export async function register(
  email: string,
  password: string
): Promise<number> {
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
export async function fetchBibleContent(
  book: string,
  chapter: number
): Promise<BibleContent> {
  try {
    const response = await apiClient.get(
      `/bible?book=${encodeURIComponent(book)}&chapter=${chapter}`
    );
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
  return useQuery<BibleContent, Error>({
    queryKey: ["bibleContent", book, chapter],
    queryFn: () => fetchBibleContent(book, chapter),
  });
}

/**
 * React Query hook for user login.
 */
export function useLogin() {
  return useMutation<string, Error, LoginInput>({
    mutationFn: ({ email, password }) => login(email, password),
  });
}

/**
 * React Query hook for user registration.
 */
export function useRegister() {
  return useMutation<number, Error, RegisterInput>({
    mutationFn: ({ email, password }) => register(email, password),
  });
}

export default apiClient;
