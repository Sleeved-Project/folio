import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { AuthResponse, SigninPayload } from '../../types';

export const useSignin = () => {
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
  });
};
