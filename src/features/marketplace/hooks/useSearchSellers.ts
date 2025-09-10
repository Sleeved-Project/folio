import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/client/http-client';
import { UsersListResponse } from '../types';

export const usersKeys = {
  all: ['users'] as const,
  search: (query: string) => [...usersKeys.all, 'search', query] as const,
};

export const useSearchSellers = (searchQuery: string) => {
  return useInfiniteQuery({
    queryKey: usersKeys.search(searchQuery),
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: '30',
      });

      if (searchQuery.trim()) {
        params.append('username', searchQuery.trim());
      }

      const queryString = params.toString().replace(/%2C/g, ',');
      const response = await httpClient.get<UsersListResponse>(`/users?${queryString}`);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
