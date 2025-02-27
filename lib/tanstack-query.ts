import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed queries up to 3 times
      refetchOnWindowFocus: false, // Disable refetching on window focus
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    },
  },
});

// QueryClientProvider wrapper to be used in the app
export const TanStackQueryProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

// Custom hook for data fetching using TanStack Query
export const useFetchData = <TData, TError>(
  queryKey: string[],
  queryFn: () => Promise<TData>
) => {
  return useQuery<TData, TError>(queryKey, queryFn);
};
