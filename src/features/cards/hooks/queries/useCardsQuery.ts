import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardsListResponse } from '../../types';

export const cardKeys = {
  all: ['card'] as const,
  list: (cardName: string) => [...cardKeys.all, 'list', cardName] as const,
};

export const useCards = (cardName: string) => {
  return useInfiniteQuery({
    queryKey: cardKeys.list(cardName),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<CardsListResponse>(
        `/cards?page=${pageParam}&limit=30&name=${cardName}`
      );
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
