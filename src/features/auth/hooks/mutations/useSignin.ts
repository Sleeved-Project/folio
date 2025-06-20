import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { AuthResponse, SigninPayload } from '../../types';
import { userKeys } from '../queries/useCurrentUser';

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: SigninPayload) => {
      try {
        const response = await httpClient.post<AuthResponse>(
          '/login',
          { email, password },
          { apiType: 'auth' }
        );
        return response;
      } catch (error: unknown) {
        console.error('Signin error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(userKeys.currentUser(), data.user);
      }
    },
  });
};
