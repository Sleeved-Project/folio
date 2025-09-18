import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { cardKeys } from './useCardsQuery';
import { CardAvailableOffersResponse } from '../../types';

export const cardAvailableOffersKeys = {
  ads: (cardId: string) => [...cardKeys.all, 'ads', cardId] as const,
};

export function useCardAvailableOffers(cardId: string) {
  return useInfiniteQuery({
    queryKey: cardAvailableOffersKeys.ads(cardId),
    queryFn: async (context) => {
      const pageParam = context.pageParam ?? 1;
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: '10',
      });

      const queryString = params.toString().replace(/%2C/g, ',');
      const response = await httpClient.get<CardAvailableOffersResponse>(
        `/cards/${cardId}/ads?${queryString}`
      );
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.meta && lastPage.meta.currentPage >= lastPage.meta.lastPage) {
        return undefined;
      }
      if (lastPage.data.length < 10) return undefined;
      return allPages.length + 1;
    },
    enabled: !!cardId,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
