import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { folioKeys } from '../queries/useAllMyCards';
import { useToaster } from '../../../../components/ui/ToasterProvider';

interface CreateFolioPayload {
  imageUrl: string;
  name: string;
  cards: { id: string; occurrence: number }[];
}

interface CreateFolioResponse {
  id: string;
  name: string;
  imageUrl: string;
  cards: { id: string; occurrence: number }[];
}

export const useCreateFolio = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();

  return useMutation<CreateFolioResponse, Error, CreateFolioPayload>({
    mutationFn: async (payload) => {
      return httpClient.post<CreateFolioResponse>('/folios', payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: folioKeys.allMyCards });
      showToast({
        message: `Folio "${variables.name}" created!`,
        type: 'success',
      });
    },
    onError: (error) => {
      showToast({
        message: error.message || 'Failed to create folio.',
        type: 'error',
      });
    },
  });
};
