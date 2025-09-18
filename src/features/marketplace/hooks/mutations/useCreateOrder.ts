import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

export const useCreateOrder = (adId: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await httpClient.post<{ message: string }>(`/orders`, {
        adId,
      });
      return response;
    },
  });
};
