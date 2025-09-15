import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardIdentifyResult } from '../../types';
import { FormDataFile } from '../../../../lib/client/types';

export interface ScanCardParams {
  photoUri: string;
  isBackSide?: boolean;
  threshold?: number;
}

export const useScanCardIdentify = () => {
  return useMutation({
    mutationFn: async ({
      photoUri,
      isBackSide = false,
      threshold = isBackSide ? 0.4 : undefined,
    }: ScanCardParams) => {
      if (!photoUri) {
        throw new Error('Photo path is required');
      }

      const formData = new FormData();
      const fileData: FormDataFile = {
        uri: photoUri,
        type: 'image/jpeg',
        name: 'card_photo.jpg',
      };

      formData.append('file', fileData as unknown as Blob);

      const url = `/scan/identify${threshold !== undefined ? `?threshold=${threshold}` : ''}`;

      const response = await httpClient.post<CardIdentifyResult>(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (isBackSide && !response.is_back_side) {
        throw new Error('Invalid back side detected');
      }

      return response;
    },
  });
};
