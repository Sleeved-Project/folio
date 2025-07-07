import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { FormattedSetsListResponse, SetsListResponse } from '../../types';
import { mapSetData } from '../../mappers/setMapper';

export const setKeys = {
  all: ['sets'] as const,
  list: (cardName: string) => [...setKeys.all, 'list', cardName] as const,
};

export const useSets = (cardName: string) => {
  return useInfiniteQuery({
    queryKey: setKeys.list(cardName),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<SetsListResponse>(
        `/sets?page=${pageParam}&limit=30&name=${cardName}`
      );

      const formattedData = response.data.map((set) => mapSetData(set));
      const formattedResponse: FormattedSetsListResponse = {
        ...response,
        data: formattedData,
      };
      return formattedResponse;
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
