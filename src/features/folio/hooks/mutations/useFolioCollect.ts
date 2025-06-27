import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { folioKeys } from '../queries/useAllMyCards';

interface CollectPayload {
  cardId: string;
}

export const useCardFolioCollect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cardId }: CollectPayload) => {
      return httpClient.post('/folios/collect', { cardId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folioKeys.allMyCards });
    },
    onError: (error) => {
      console.error('Failed to add card to collection:', error);
    },
  });
};
