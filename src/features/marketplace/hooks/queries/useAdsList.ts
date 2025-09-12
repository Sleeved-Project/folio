import { useInfiniteQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { AdsListResponse } from '../../types';

export const adsKeys = {
  all: ['ads'] as const,
  searchAds: (query: string) => [...adsKeys.all, 'searchAds', { query }] as const,
};

export const useAdsList = () => {
  return useInfiniteQuery({
    queryKey: adsKeys.all,
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: '20',
      });

      const queryString = params.toString().replace(/%2C/g, ',');
      const response = await httpClient.get<AdsListResponse>(`/ads?${queryString}`);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useSearchCardAds = (query: string) => {
  return useInfiniteQuery({
    queryKey: adsKeys.searchAds(query),
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        query,
        page: String(pageParam),
        limit: '20',
      });

      const queryString = params.toString().replace(/%2C/g, ',');
      const response = await httpClient.get<AdsListResponse>(`/ads/search?${queryString}`);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length === 0) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    enabled: query.trim().length > 0,
    retry: false,
  });
};
