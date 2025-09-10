import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CreateAccountResponse } from '../../types';

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await httpClient.get<CreateAccountResponse>(`/payment/account`);
      return response.linkingUrl;
    },
  });
};
