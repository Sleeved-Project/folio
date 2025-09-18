import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CancelPaymentSheetResponse } from '../../types';

export const useCancelPaymentSheet = (adId: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await httpClient.patch<CancelPaymentSheetResponse>(`/payment/sheet`, {
        id: adId,
      });
      return response;
    },
  });
};
