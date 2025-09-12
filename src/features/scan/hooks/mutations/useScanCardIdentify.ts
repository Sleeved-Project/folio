import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardIdentifyResult } from '../../types';
import { FormDataFile } from '../../../../lib/client/types';

// Type pour les paramètres - accepte soit une string simple, soit un objet avec plusieurs formats possibles
type ScanParams =
  | string
  | {
      photoPath?: string;
      photoUri?: string;
      threshold?: number;
    };

export const useScanCardIdentify = () => {
  return useMutation({
    mutationFn: async (params: ScanParams) => {
      // Extraire le chemin de la photo (compatible avec photoPath ou photoUri)
      const photoPath = typeof params === 'string' ? params : params.photoPath || params.photoUri;

      if (!photoPath) {
        throw new Error('Photo path is required');
      }

      const threshold = typeof params === 'object' ? params.threshold : undefined;

      const formData = new FormData();
      const fileData: FormDataFile = {
        uri: photoPath,
        type: 'image/jpeg',
        name: 'card_photo.jpg',
      };

      formData.append('file', fileData as unknown as Blob);

      const url =
        threshold !== undefined ? `/scan/identify?threshold=${threshold}` : '/scan/identify';

      console.log('url:', url, threshold);
      const response = await httpClient.post<CardIdentifyResult>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },
  });
};
