import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { authUtils } from '../../utils/auth-utils';
import type { AuthResponse, SignupPayload } from '../../types';
import { userKeys } from '../queries/useCurrentUser';

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: SignupPayload) => {
      const response = await httpClient.post<AuthResponse>('/register', userData, {
        apiType: 'auth',
      });

      // Only set token if it exists (won't exist for unverified emails)
      if (response.token) {
        await authUtils.setToken(response.token);
      }

      return response;
    },
    onSuccess: (data) => {
      // Only update user data if we have a user
      if (data.user) {
        queryClient.setQueryData(userKeys.currentUser(), data.user);
        queryClient.invalidateQueries({ queryKey: userKeys.currentUser() });
      }
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};
