import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { authUtils } from '../../utils/auth-utils';
import type { AuthResponse, SigninPayload } from '../../types';
import { userKeys } from '../queries/useCurrentUser';

export const useSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: SigninPayload) => {
      const response = await httpClient.post<AuthResponse>('/login', credentials, {
        apiType: 'auth',
      });

      if (response.token) {
        await authUtils.setToken(response.token);
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.currentUser(), data.user);

      queryClient.invalidateQueries({ queryKey: userKeys.currentUser() });
    },
  });
};
