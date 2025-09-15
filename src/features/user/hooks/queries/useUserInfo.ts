import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { AdsListResponse } from '../../../marketplace/types';

export interface UserProfileData {
  id: string;
  username: string;
  firstname: string | null;
  lastname: string | null;
  profilePictureUrl: string | null;
  phone: string | null;
  description: string | null;
}

export const userProfileKeys = {
  all: ['userProfile'] as const,
  details: (userId: string) => [...userProfileKeys.all, userId] as const,
  userAds: (userId: string) => [...userProfileKeys.all, 'ads', userId] as const,
};

export function useUserProfile(userId?: string) {
  return useQuery<UserProfileData>({
    queryKey: userProfileKeys.details(userId as string),
    queryFn: async () => {
      const uri = userId ? `/users/${userId}` : '/me';

      const response = await httpClient.get<UserProfileData>(uri);
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserAds(userId: string) {
  return useInfiniteQuery<AdsListResponse>({
    queryKey: userProfileKeys.userAds(userId),
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: '20',
      });

      console.log(`/users/${userId}/ads?${params.toString()}`);
      const response = await httpClient.get<AdsListResponse>(
        `/users/${userId}/ads?${params.toString()}`
      );
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
}
