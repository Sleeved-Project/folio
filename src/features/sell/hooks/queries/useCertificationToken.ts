import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

interface tokenCountDTO {
  remainingCertificateToken: number;
}

const fetchCertificationTokenCount = async (): Promise<number> => {
  const response = await httpClient.get<tokenCountDTO>(`/me/tokens`);
  return response.remainingCertificateToken;
};

export const useCertificationToken = () => {
  return useQuery({
    queryKey: ['certification-token'],
    queryFn: fetchCertificationTokenCount,
    staleTime: 5 * 60 * 1000,
  });
};
