import { useMutation } from '@tanstack/react-query';

export interface CertificationInputDTO {
  id: string;
  globalRate: string;
  label: string;
  certifiedAt: string;
  centeringRate: string;
  cornerRate: string;
  edgeRate: string;
  surfaceRate: string;
  description: string;
}

const mockCertificationData: CertificationInputDTO = {
  id: 'ABC123456',
  globalRate: '9.0',
  label: 'Mint',
  certifiedAt: new Date().toLocaleDateString(),
  centeringRate: '8.5',
  cornerRate: '9.0',
  edgeRate: '8.8',
  surfaceRate: '9.2',
  description: 'Excellent condition with minor imperfections.',
};

const fetchCertification = async (): Promise<CertificationInputDTO> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockCertificationData;
};

export const useCertificate = () => {
  return useMutation({
    mutationFn: fetchCertification,
  });
};
