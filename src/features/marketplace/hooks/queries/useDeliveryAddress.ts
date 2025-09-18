import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { AddressResponse } from '../../types';

const addressKey = () => ['address'];

export const useDeliveryAddress = () => {
  return useQuery({
    queryKey: addressKey(),
    queryFn: async () => {
      const response = await httpClient.get<AddressResponse>(`/me/addresses/main`);
      return response.address;
    },
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
