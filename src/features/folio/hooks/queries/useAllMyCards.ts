import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardsListResponse, Card } from '../../../cards/types';
import { mapMyCardsApiToCards } from '../../mappers/myCardsMapper';
import { MyCardsListResponse } from '../../types';

export const folioKeys = {
  allMyCards: ['folio', 'allMyCards'] as const,
};

export const useAllMyCards = () => {
  return useInfiniteQuery<{ data: Card[]; meta: CardsListResponse['meta'] }, Error>({
    queryKey: folioKeys.allMyCards,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<MyCardsListResponse>(
        `/folios/cards?page=${pageParam}&limit=30`
      );
      return {
        data: mapMyCardsApiToCards(response.data),
        meta: response.meta,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.meta || lastPage.meta.currentPage >= lastPage.meta.lastPage) {
        return undefined;
      }
      return lastPage.meta.currentPage + 1;
    },
  });
};
