import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/client/http-client';
import { HasValidStripeAccountResponse } from '../types';

export const useHasValidStripeAccount = () => {
  return useQuery({
    queryKey: ['hasValidStripeAccount'],
    queryFn: async () => {
      const data = await httpClient.get<HasValidStripeAccountResponse>('/me/stripe');
      return data.hasValidStripeAccount;
    },
  });
};
