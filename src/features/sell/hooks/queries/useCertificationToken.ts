import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';

interface tokenCountDTO {
  remaningCertificateToken: number;
}

const fetchCertificationTokenCount = async (): Promise<number> => {
  const response = await httpClient.get<tokenCountDTO>(`/me/tokens`);
  return response.remaningCertificateToken;
};

export const useCertificationToken = () => {
  return useQuery({
    queryKey: ['certification-token'],
    queryFn: fetchCertificationTokenCount,
    staleTime: 5 * 60 * 1000,
  });
};
