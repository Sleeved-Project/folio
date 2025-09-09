import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/client/http-client';

export const useHasStripeAccount = () => {
  return useQuery({
    queryKey: ['hasStripeAccount'],
    queryFn: async () => {
      try {
        const hasStripeAccount = await httpClient.get<boolean>('/user/stripe');
        console.log('Fetched Stripe account status:', hasStripeAccount);

        return hasStripeAccount;
      } catch (error) {
        console.error('Error fetching Stripe account status:', error);
        return false;
      }
    },
  });
};
