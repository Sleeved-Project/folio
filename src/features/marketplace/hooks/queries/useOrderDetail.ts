import { useQuery } from '@tanstack/react-query';
import { adsKeys } from './useAdsList';
import { httpClient } from '../../../../lib/client/http-client';
import { Order } from '../../types';
import { mapOrderData } from '../../../user/mappers/orderMapper';

export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: adsKeys.getAdById(orderId),
    queryFn: async () => {
      const response = await httpClient.get<Order>(`/me/orders/${orderId}`);
      return mapOrderData(response);
    },
    enabled: !!orderId,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
