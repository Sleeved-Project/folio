import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

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
};

export function useUserProfile(userId?: string) {
  return useQuery<UserProfileData>({
    queryKey: userProfileKeys.details(userId as string),
    queryFn: async () => {
      const uri = userId ? `/me/${userId}` : '/me';

      const response = await httpClient.get<UserProfileData>(uri);
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });
}
