import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { AuthResponse } from '../../types';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { authUtils } from '../../utils/auth-utils';

interface VerifyEmailPayload {
  email: string;
  code: string;
}

export const useVerifyEmailCode = () => {
  const router = useRouter();
  const { setIsAuthenticated, setPendingVerificationEmail } = useAuth();

  return useMutation({
    mutationFn: async ({ email, code }: VerifyEmailPayload) => {
      const response = await httpClient.post<AuthResponse>(
        '/verify-email',
        { email, code },
        { apiType: 'auth' }
      );
      return response;
    },

    onSuccess: async (response) => {
      if (response.token) {
        await authUtils.setToken(response.token);
        setIsAuthenticated(true);
        setPendingVerificationEmail(null);

        router.replace('/');
      } else {
        console.warn('useVerifyEmail: No token received in verification response');
      }
    },

    onError: (error) => {
      console.error('useVerifyEmail: Verification failed', error);
    },
  });
};
