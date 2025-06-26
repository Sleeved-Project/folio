import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

interface CollectPayload {
  cardId: string;
}

export const useCardFolioCollect = () => {
  return useMutation({
    mutationFn: async ({ cardId }: CollectPayload) => {
      return httpClient.post('/folios/collect', { cardId });
    },
    onError: (error) => {
      console.error('Failed to add card to collection:', error);
    },
  });
};
