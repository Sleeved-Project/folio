import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardsListResponse } from '../../../cards/types';

export const setCardKeys = {
  all: ['card'] as const,
  list: (setId: string, cardName: string) => [...setCardKeys.all, 'list', setId, cardName] as const,
};

export const useSetCards = (setId: string, cardName: string) => {
  return useInfiniteQuery({
    queryKey: setCardKeys.list(setId, cardName),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<CardsListResponse>(
        `/sets/${setId}/cards?page=${pageParam}&limit=30&name=${cardName}`
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
