import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { Address } from '../../types';

const addressKey = (addressId: string) => ['address', addressId];

export const useCreateBuyerAddress = (addressId: string) => {
  return useQuery({
    queryKey: addressKey(addressId),
    queryFn: async () => {
      const response = await httpClient.get<Address>(`/addresses/${addressId}`);
      return response;
    },
    enabled: !!addressId,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
