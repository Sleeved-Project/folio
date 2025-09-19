import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { Checkout } from '../../types';
import { mapCheckoutData } from '../../mappers/checkoutMapper';

const checkoutKey = (adId: string) => ['checkout', adId];

export const useCheckout = (adId: string) => {
  return useQuery({
    queryKey: checkoutKey(adId),
    queryFn: async () => {
      const response = await httpClient.get<Checkout>(`/ads/${adId}/checkout`);
      const formattedData = mapCheckoutData(response);
      return formattedData;
    },
    enabled: !!adId,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
