import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import type { AuthResponse, SignupPayload } from '../../types';
import { userKeys } from '../../utils/authQueryKeys';

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: SignupPayload) => {
      const response = await httpClient.post<AuthResponse>('/register', userData, {
        apiType: 'auth',
      });

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
