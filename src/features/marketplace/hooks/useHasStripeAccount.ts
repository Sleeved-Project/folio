import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/client/http-client';
import { HasStripeAccountResponse } from '../types';

export const useHasStripeAccount = () => {
  return useQuery({
    queryKey: ['hasStripeAccount'],
    queryFn: async () => {
      const data = await httpClient.get<HasStripeAccountResponse>('/me/stripe');
      return data.hasStripeAccount;
    },
  });
};
