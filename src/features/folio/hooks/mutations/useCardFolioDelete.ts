import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { folioCardsKeys } from '../queries/useAllMyCards';
import { foliosKeys } from '../queries/useFolios';
import { cardKeys } from '../../../cards/hooks/queries/useCardsQuery';
import { useToaster } from '../../../../components/ui/ToasterProvider';
import { setKeys } from '../../../sets/hooks/queries/useSetsQuery';

interface DeleteCardPayload {
  cardId: string;
}

interface DeleteCardResponse {
  message: string;
}

export const useCardFolioDelete = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  return useMutation<DeleteCardResponse, Error, DeleteCardPayload>({
    mutationFn: async ({ cardId }) => {
      return httpClient.delete<DeleteCardResponse>(`/folios/cards/${cardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folioCardsKeys.all });
      queryClient.invalidateQueries({ queryKey: foliosKeys.all });
      queryClient.invalidateQueries({ queryKey: cardKeys.list('') });
      queryClient.invalidateQueries({ queryKey: setKeys.all });
    },
    onError: (error) => {
      showToast({
        message: error.message || 'Failed to remove card from collection.',
        type: 'error',
      });
    },
  });
};
