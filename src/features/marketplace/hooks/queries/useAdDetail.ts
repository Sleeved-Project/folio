import { useQuery } from '@tanstack/react-query';
import { adsKeys } from './useAdsList';
import { httpClient } from '../../../../lib/client/http-client';
import { Ad } from '../../types';
import { mapAdDetail } from '../../mappers/adDetailMapper';

export const useAdDetail = (adId: string) => {
  return useQuery({
    queryKey: adsKeys.getAdById(adId),
    queryFn: async () => {
      const response = await httpClient.get<Ad>(`/ads/${adId}`);
      return mapAdDetail(response);
    },
    enabled: !!adId,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
