import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { FormattedSetsListResponse, SetDetailType, SetsListResponse } from '../../types';
import { mapSetData, mapSetDetailData } from '../../mappers/setMapper';

export const setKeys = {
  all: ['sets'] as const,
  list: (cardName: string) => [...setKeys.all, 'list', cardName] as const,
  details: (id: string) => [...setKeys.all, 'details', id] as const,
};

export const useSets = (cardName: string) => {
  return useInfiniteQuery({
    queryKey: setKeys.list(cardName),
    queryFn: async ({ pageParam = 1 }) => {
      const trimmedCardName = cardName.trim();
      const response = await httpClient.get<SetsListResponse>(
        `/sets?page=${pageParam}&limit=30&name=${trimmedCardName}`
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

export const useSetDetailedInfo = (setId: string) => {
  return useQuery({
    queryKey: setKeys.details(setId),
    queryFn: async () => {
      if (!setId) throw new Error('Set ID is required');
      const response = await httpClient.get<SetDetailType>(`/sets/${setId}/details`);
      return mapSetDetailData(response);
    },
    enabled: !!setId,
    staleTime: 5 * 60 * 1000,
  });
};
