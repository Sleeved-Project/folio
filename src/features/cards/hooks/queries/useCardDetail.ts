import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardBasicInfo, CardDetailedInfo } from '../../types';

export const cardKeys = {
  all: ['card'] as const,
  detail: (id: string) => [...cardKeys.all, 'detail', id] as const,
  details: (id: string) => [...cardKeys.all, 'details', id] as const,
};

export const useCardDetail = (cardId: string) => {
  return useQuery({
    queryKey: cardKeys.detail(cardId || ''),
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
    queryKey: cardKeys.details(cardId || ''),
    queryFn: async () => {
      if (!cardId) throw new Error('Card ID is required');
      const response = await httpClient.get<CardDetailedInfo>(`/cards/${cardId}/details`);
      return response;
    },
    enabled: !!cardId,
    staleTime: 5 * 60 * 1000,
  });
};
