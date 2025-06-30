import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { folioKeys } from '../queries/useAllMyCards';
import { useToaster } from '../../../../components/ui/ToasterProvider';

interface UpdateOccurrencePayload {
  cardId: string;
  occurrence: number;
}

interface UpdateOccurrenceResponse {
  message: string;
}

export const useCardFolioUpdateOccurrence = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  return useMutation<UpdateOccurrenceResponse, Error, UpdateOccurrencePayload>({
    mutationFn: async ({ cardId, occurrence }) => {
      return httpClient.patch<UpdateOccurrenceResponse>(`/folios/cards/${cardId}/occurrence`, {
        occurrence,
      });
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: folioKeys.allMyCards });
      showToast({
        message: `Card added x${variables.occurrence} to your collection!`,
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        message: error.message || 'Failed to update card occurrence.',
        type: 'error',
      });
      console.error(error);
    },
  });
};
