import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { PaginatedFilterOption } from '../../types';
import { mapPaginatedFilterOptionToFilterOption } from '../../mappers/filterMapper';

export const filterKeys = {
  all: ['filter'] as const,
  list: (artistName: string) => [...filterKeys.all, artistName] as const,
};

export const useFilters = (artistName: string) => {
  return useInfiniteQuery({
    queryKey: filterKeys.list(artistName),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<PaginatedFilterOption>(
        `/filters/cards?page=${pageParam}&limit=30&name=${artistName.trim()}`
      );
      const filterOption = mapPaginatedFilterOptionToFilterOption(response);

      return filterOption;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.artists && Object.keys(lastPage.artists).length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
