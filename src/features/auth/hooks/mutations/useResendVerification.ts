import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

interface ResendVerificationPayload {
  email: string;
}

interface ResendVerificationResponse {
  message: string;
  success: boolean;
}

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const payload: ResendVerificationPayload = { email };

      const response = await httpClient.post<ResendVerificationResponse>(
        '/resend-verification',
        payload,
        { apiType: 'auth' }
      );

      return response;
    },
  });
};
