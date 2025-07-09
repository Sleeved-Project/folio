import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardBasicInfo, CardDetailedInfo, CardsListResponse } from '../../types';
import { Filters } from '../../../filters/types';

export const cardKeys = {
  all: ['card'] as const,
  list: (cardName: string, filters?: Filters) =>
    [...cardKeys.all, 'list', cardName, filters] as const,
  detail: (id: string) => [...cardKeys.all, 'detail', id] as const,
  detailedInfo: (id: string) => [...cardKeys.all, 'detailedInfo', id] as const,
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

export const useCardDetail = (cardId: string) => {
  return useQuery({
    queryKey: cardKeys.detail(cardId),
    queryFn: async () => {
      if (!cardId) throw new Error('Card ID is required');
      const response = await httpClient.get<CardBasicInfo>(`/cards/${cardId}`);
      return response;
    },
    enabled: !!cardId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCardDetailedInfo = (cardId: string) => {
  return useQuery({
    queryKey: cardKeys.detailedInfo(cardId),
    queryFn: async () => {
      if (!cardId) throw new Error('Card ID is required');
      const response = await httpClient.get<CardDetailedInfo>(`/cards/${cardId}/details`);
      return response;
    },
    enabled: !!cardId,
    staleTime: 5 * 60 * 1000,
  });
};
