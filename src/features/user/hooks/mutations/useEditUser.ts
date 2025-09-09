import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { userProfileKeys } from '../queries/useUserInfo';
import { UserProfileData } from '../queries/useUserInfo';
import { UserProfileFormValues } from '../../schemas/userSchema';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: UserProfileFormValues) => {
      const response = await httpClient.patch<UserProfileData>('/me', userData);
      return response;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });

      // Optimistically update the user profile in the cache
      queryClient.setQueryData(
        userProfileKeys.details('me'),
        (oldData: UserProfileData | undefined) => {
          if (!oldData) return oldData;
          return { ...oldData, ...updatedUser };
        }
      );
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });
};
