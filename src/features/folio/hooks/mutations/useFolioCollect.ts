import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { useToaster } from '../../../../components/ui/ToasterProvider';

interface CollectPayload {
  cardId: string;
}

interface CollectResponse {
  message: string;
}

export const useCardFolioCollect = () => {
  const { showToast } = useToaster();

  return useMutation<CollectResponse, Error, CollectPayload>({
    mutationFn: async ({ cardId }: CollectPayload) => {
      return httpClient.post('/folios/collect', { cardId });
    },
    onSuccess: (response) => {
      showToast({ message: response.message || 'Card added to your collection!', type: 'success' });
    },
    onError: (error) => {
      showToast({ message: error.message || 'An error occured, please try later', type: 'error' });
    },
  });
};
