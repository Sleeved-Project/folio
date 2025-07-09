import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardsListResponse } from '../../../cards/types';
import { Filters } from '../../../filters/types';

export const setCardKeys = {
  all: ['card'] as const,
  list: (setId: string, cardName: string, filters?: Filters) =>
    [...setCardKeys.all, 'list', setId, cardName, filters] as const,
};

export const useSetCards = (setId: string, cardName: string, filters?: Filters) => {
  return useInfiniteQuery({
    queryKey: setCardKeys.list(setId, cardName, filters),
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
      const response = await httpClient.get<CardsListResponse>(
        `/sets/${setId}/cards?${queryString}`
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
