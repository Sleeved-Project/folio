import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/client/http-client';

export const useHasStripeAccount = () => {
  return useQuery({
    queryKey: ['hasStripeAccount'],
    queryFn: async () => {
      const hasStripeAccount = await httpClient.get<boolean>('/user/stripe');
      return hasStripeAccount;
    },
  });
};
