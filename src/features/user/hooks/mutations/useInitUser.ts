import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

export const useInitUser = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await httpClient.post('/user/init', {});
      return response;
    },
    onError: () => {
      Alert.alert('Error', 'Failed to initialize user. Please try again later.');
      console.error('Failed to initialize user');
    },
  });
};
