import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardPricesData } from '../../types';
import { cardKeys } from './useCardDetail';
import { mapCardPricesData } from '../../mappers/cardPricesMapper';

export const useCardPrices = (cardId: string) => {
  return useQuery({
    queryKey: [...cardKeys.all, 'prices', cardId],
    queryFn: async () => {
      if (!cardId) throw new Error('Card ID is required');
      const response = await httpClient.get<CardPricesData>(`/cards/${cardId}/prices`);

      // Transform raw API data to display-friendly format
      return mapCardPricesData(response);
    },
    enabled: !!cardId,
    staleTime: 5 * 60 * 1000,
  });
};
