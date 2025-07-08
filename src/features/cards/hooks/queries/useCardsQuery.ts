import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardsListResponse } from '../../types';
import { Filters } from '../../../filters/types';

export const cardKeys = {
  all: ['card'] as const,
  list: (cardName: string, filters?: Filters) =>
    [...cardKeys.all, 'list', cardName, filters] as const,
};

export const useCards = (cardName: string, filters?: Filters) => {
  return useInfiniteQuery({
    queryKey: cardKeys.list(cardName, filters),
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: '30',
      });

      if (cardName.trim()) {
        params.append('name', cardName);
      }

      if (filters) {
        filters.forEach(({ label, values }) => {
          if (values && values.length > 0) {
            const paramName =
              values.length === 1 ? `${label.toLowerCase()}[]` : label.toLowerCase();
            params.append(paramName, values.join(','));
          }
        });
      }

      const queryString = params.toString().replace(/%2C/g, ',');
      const response = await httpClient.get<CardsListResponse>(`/cards?${queryString}`);
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
