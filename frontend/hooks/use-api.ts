import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch Bible content
export const useFetchBibleContent = (chapter: number) => {
  return useQuery(["bibleContent", chapter], async () => {
    const response = await apiClient.get(`/bible/chapter/${chapter}`);
    return response.data;
  });
};

// Authentication: Login
export const useLogin = () => {
  return useMutation(async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  });
};

// Authentication: Register
export const useRegister = () => {
  return useMutation(async (userData: { email: string; password: string }) => {
    const response = await apiClient.put("/auth/register", userData);
    return response.data;
  });
};

// Query Client Provider Wrapper
export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
