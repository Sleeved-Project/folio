import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { User } from '../../types';
import { authUtils } from '../../utils/auth-utils';
import { useState, useEffect } from 'react';
import { userKeys } from '../../utils/authQueryKeys';

export const useCurrentUser = () => {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const isAuthenticated = await authUtils.isAuthenticated();
      setHasToken(isAuthenticated);
    };

    checkToken();
  }, []);

  return useQuery({
    queryKey: userKeys.currentUser(),
    queryFn: async () => {
      try {
        const user = await httpClient.get<User>('/me', { apiType: 'auth' });
        return user;
      } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
          await authUtils.clearTokens();
          setHasToken(false);
        }
        throw error;
      }
    },
    enabled: hasToken === true,
    staleTime: 5 * 60 * 1000,
  });
};
