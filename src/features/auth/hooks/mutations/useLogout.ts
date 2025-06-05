import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authUtils } from '../../utils/auth-utils';
import { userKeys } from '../queries/useCurrentUser';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authUtils.removeToken();
      return true;
    },
    onSuccess: () => {
      queryClient.setQueryData(userKeys.currentUser(), null);
    },
  });
};
