import { useQuery } from '@tanstack/react-query';
import { adsKeys } from './useAdsList';
import { httpClient } from '../../../../lib/client/http-client';
import { OrderDetail } from '../../types';
import { mapOrderDetailData } from '../../../user/mappers/orderMapper';

export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: adsKeys.getAdById(orderId),
    queryFn: async () => {
      const response = await httpClient.get<OrderDetail>(`/me/orders/${orderId}`);
      return mapOrderDetailData(response);
    },
    enabled: !!orderId,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
