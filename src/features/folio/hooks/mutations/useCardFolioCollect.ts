import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { useToaster } from '../../../../components/ui/ToasterProvider';
import { folioCardsKeys } from '../queries/useAllMyCards';
import { setKeys } from '../../../sets/hooks/queries/useSetsQuery';
import { cardKeys } from '../../../cards/hooks/queries/useCardsQuery';

interface CollectPayload {
  cardId: string;
}

interface CollectResponse {
  message: string;
}

export const useCardFolioCollect = () => {
  const { showToast } = useToaster();

  const queryClient = useQueryClient();
  return useMutation<CollectResponse, Error, CollectPayload>({
    mutationFn: async ({ cardId }: CollectPayload) => {
      return httpClient.post('/folios/cards', { cardId });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: folioCardsKeys.all });
      queryClient.invalidateQueries({ queryKey: cardKeys.list('') });
      queryClient.invalidateQueries({ queryKey: setKeys.all });
      showToast({ message: response.message || 'Card added to your collection!', type: 'success' });
    },
    onError: (error) => {
      showToast({ message: error.message || 'An error occured, please try later', type: 'error' });
    },
  });
};
