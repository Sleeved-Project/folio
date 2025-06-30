import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardsListResponse } from '../../../cards/types';

export const setCardKeys = {
  all: ['setCards'] as const,
  list: (setId: string) => [...setCardKeys.all, 'list', setId] as const,
};

export const useSetCards = (setId: string) => {
  return useInfiniteQuery({
    queryKey: setCardKeys.list(setId),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<CardsListResponse>(
        `/sets/${setId}/cards?page=${pageParam}&limit=30`
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
