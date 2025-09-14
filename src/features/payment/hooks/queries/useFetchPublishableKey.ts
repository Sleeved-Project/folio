import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { FetchPublishableKeyResponse } from '../../types';

export const useFetchPublishableKey = () => {
  return useQuery({
    queryKey: ['publishableKey'],
    queryFn: async () => {
      const response = await httpClient.get<FetchPublishableKeyResponse>('/payment/publishablekey');
      return response;
    },
  });
};
