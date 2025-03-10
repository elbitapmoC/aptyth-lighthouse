import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

// Create a QueryClient instance
const queryClient = new QueryClient();

// API client instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Custom hook for GET requests
export function useApiQuery<TData, TError>(
  queryKey: string[],
  endpoint: string,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  }
) {
  return useQuery<TData, TError>(
    queryKey,
    async () => {
      const response = await apiClient.get(endpoint);
      return response.data;
    },
    {
      enabled: options?.enabled ?? true,
      refetchOnWindowFocus: options?.refetchOnWindowFocus ?? true,
    }
  );
}

// Custom hook for POST/PUT/DELETE requests
export function useApiMutation<TData, TError, TVariables>(
  endpoint: string,
  method: "post" | "put" | "delete",
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
  }
) {
  return useMutation<TData, TError, TVariables>(
    async (variables) => {
      const response = await apiClient.request({
        url: endpoint,
        method,
        data: variables,
      });
      return response.data;
    },
    {
      onSuccess: options?.onSuccess,
      onError: options?.onError,
    }
  );
}

// QueryProvider component for wrapping the app
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
