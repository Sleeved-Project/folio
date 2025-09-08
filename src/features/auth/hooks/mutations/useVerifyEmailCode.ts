import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { AuthResponse } from '../../types';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { authUtils } from '../../utils/auth-utils';
import { useInitUser } from '../../../user/hooks/mutations/useInitUser';

interface VerifyEmailPayload {
  email: string;
  code: string;
}

export const useVerifyEmailCode = () => {
  const router = useRouter();
  const { setIsAuthenticated, setPendingVerificationEmail } = useAuth();
  const { mutateAsync: initUser } = useInitUser();

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
      if (!response.token) {
        throw new Error('Verification failed: No token received');
      }
      await authUtils.setTokens({ token: response.token, refreshToken: response.refreshToken });
      setIsAuthenticated(true);
      setPendingVerificationEmail(null);

      try {
        await initUser();
      } catch (error) {
        console.error('Failed to initialize user:', error);
      }

      router.replace('/');
    },

    onError: (error) => {
      console.error('useVerifyEmail: Verification failed', error);
    },
  });
};
