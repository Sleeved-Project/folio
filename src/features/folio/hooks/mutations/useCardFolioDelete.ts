import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { folioKeys } from '../queries/useAllMyCards';
import { useToaster } from '../../../../components/ui/ToasterProvider';

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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: folioKeys.allMyCards });
      showToast({
        message: response.message || 'Card removed from your collection!',
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        message: error.message || 'Failed to remove card from collection.',
        type: 'error',
      });
    },
  });
};
