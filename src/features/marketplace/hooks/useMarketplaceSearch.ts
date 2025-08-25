import { useState, useEffect, useRef, useCallback } from 'react';

export function useMarketplaceSearch<T>(
  searchFn: (query: string) => Promise<T[]>,
  query: string,
  debounceTime = 350
) {
  const [results, setResults] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastRequestId = useRef(0);

  const runSearch = useCallback(
    async (q: string, requestId: number) => {
      if (!q.trim()) {
        setResults([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await searchFn(q);
        if (requestId !== lastRequestId.current) return;
        setResults(data);
      } catch (e) {
        if (requestId !== lastRequestId.current) return;
        setError('An error occurred. Please try again.' + e);
      } finally {
        if (requestId === lastRequestId.current) {
          setIsLoading(false);
        }
      }
    },
    [searchFn]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const reqId = ++lastRequestId.current;
    debounceRef.current = setTimeout(() => {
      runSearch(query, reqId);
    }, debounceTime);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, debounceTime, runSearch]);

  return { results, isLoading, error };
}
