import {
  QueryClient,
  type UseMutationResult,
  type UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Types for API responses
interface BibleContent {
  verses: Array<{
    verse: number;
    text: string;
  }>;
  chapter: number;
  book: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

// Fetch Bible content
export const useFetchBibleContent = (
  chapter: number
): UseQueryResult<BibleContent> => {
  return useQuery({
    queryKey: ["bibleContent", chapter],
    queryFn: async () => {
      const response = await apiClient.get(`/bible/chapter/${chapter}`);
      return response.data;
    },
  });
};

// Authentication: Login
export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  { email: string; password: string }
> => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data;
    },
  });
};

// Authentication: Register
export const useRegister = (): UseMutationResult<
  AuthResponse,
  Error,
  { email: string; password: string; name: string }
> => {
  return useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      name: string;
    }) => {
      const response = await apiClient.post("/auth/register", userData);
      return response.data;
    },
  });
};

// Export the query client for use in other files
export { queryClient };
