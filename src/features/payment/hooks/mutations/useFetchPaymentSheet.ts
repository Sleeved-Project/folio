import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CreatePaymentSheetResponse } from '../../types';

export const useFetchPaymentSheet = (adId: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await httpClient.get<CreatePaymentSheetResponse>(`/payment/${adId}/sheet`);
      return response;
    },
  });
};
