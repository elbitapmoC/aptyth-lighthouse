import { useQuery } from "@tanstack/react-query";
import { getBibleContent } from "@/backend/models/bible";

/**
 * Custom hook for fetching Bible content with caching and offline support.
 * This hook uses TanStack Query to manage data fetching, caching, and revalidation.
 *
 * @param book - The name of the book in the Bible.
 * @param chapter - The chapter number.
 * @returns An object containing the Bible content, loading state, and error (if any).
 */
export default function useBibleContent(book: string, chapter: number) {
  const {
    data: verses,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["bibleContent", book, chapter],
    () => getBibleContent(book, chapter),
    {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
      cacheTime: 1000 * 60 * 30, // Keep unused data in cache for 30 minutes
      retry: 3, // Retry failed requests up to 3 times
      refetchOnWindowFocus: false, // Disable refetching on window focus
    }
  );

  return { verses, isLoading, isError, error };
}
