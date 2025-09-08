import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { useToaster } from '../../../../components/ui/ToasterProvider';

interface CheckParams {
  email?: string;
  username?: string;
}

interface AvailabilityResponse {
  email?: {
    available: boolean;
  };
  username?: {
    available: boolean;
  };
}

export const useCheckAvailability = () => {
  const { showToast } = useToaster();

  return useMutation({
    mutationFn: async (params: CheckParams): Promise<AvailabilityResponse> => {
      const queryParams = new URLSearchParams();

      if (params.email) {
        queryParams.append('email', params.email);
      }

      if (params.username) {
        queryParams.append('username', params.username);
      }

      return httpClient.get<AvailabilityResponse>(`/availability?${queryParams.toString()}`, {
        apiType: 'auth',
      });
    },
    onError: (error) => {
      showToast({
        message: error.message || 'Failed to check availability.',
        type: 'error',
      });
      console.error(error);
    },
  });
};
