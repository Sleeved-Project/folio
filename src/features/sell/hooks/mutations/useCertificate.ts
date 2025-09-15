import { useMutation } from '@tanstack/react-query';
import { SellFormData } from '../../schemas/sellFormSchema';
import { httpClient } from '../../../../lib/client/http-client';
import { FormDataFile } from '../../../../lib/client/types';
import { mapCertificationInputDTOToCertification } from '../../mappers/certificationMapper';

export interface Certification {
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

export interface CertificationInputDTO {
  id: string;
  globalRating: string;
  centeringRating: string;
  cornerRating: string;
  edgeRating: string;
  surfaceRating: string;
  certifiedAt: string;
  grade: {
    label: string;
    description: string;
    code: string;
  };
}

const fetchCertification = async (formData: Partial<SellFormData>): Promise<Certification> => {
  const fileData: FormDataFile = {
    uri: formData.rectoImage!,
    type: 'image/jpeg',
    name: 'recto_photo.jpg',
  };

  const formDataToSend = new FormData();

  formDataToSend.append('file', fileData as unknown as Blob);
  formDataToSend.append('cardId', formData.cardId || '');

  const response = await httpClient.post<CertificationInputDTO>('/scan/grade', formDataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return mapCertificationInputDTOToCertification(response);
};

export function useCertificate(formData: Partial<SellFormData>) {
  return useMutation({
    mutationFn: () => fetchCertification(formData),
  });
}
