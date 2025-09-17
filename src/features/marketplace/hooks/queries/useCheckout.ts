import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { Checkout } from '../../types';

const checkoutKey = (adId: string) => ['checkout', adId];

export const useCheckout = (adId: string) => {
  return useQuery({
    queryKey: checkoutKey(adId),
    queryFn: async () => {
      const response = await httpClient.get<Checkout>(`/ads/${adId}/checkout`);
      return response;
    },
    enabled: !!adId,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
