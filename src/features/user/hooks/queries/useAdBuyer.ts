import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { adsKeys } from '../../../marketplace/hooks/queries/useAdsList';

export interface AdBuyerInformation {
  username: string;
  profilePictureUrl: string;
}

export const useAdBuyer = (adId: string) => {
  return useQuery({
    queryKey: adsKeys.getBuyerByAdId(adId),
    queryFn: async () => {
      const response = await httpClient.get<AdBuyerInformation>(`/me/ads/${adId}/buyer`);
      return response;
    },
    enabled: !!adId,
    retry: false,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
