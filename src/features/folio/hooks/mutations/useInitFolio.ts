import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

interface InitFolioResponse {
  success: boolean;
  message?: string;
  folioId?: string;
}

export const useInitFolio = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await httpClient.post<InitFolioResponse>('/folios/init', {});
      return response;
    },
    onError: () => {
      Alert.alert('Error', 'Failed to initialize folio. Please try again later.');
      console.error('Failed to initialize folio');
    },
  });
};
