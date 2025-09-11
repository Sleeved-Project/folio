import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardIdentifyResult } from '../../types';
import { FormDataFile } from '../../../../lib/client/types';

export const useScanCardIdentify = () => {
  return useMutation({
    mutationFn: async (photoPath: string) => {
      const formData = new FormData();

      const fileData: FormDataFile = {
        uri: photoPath,
        type: 'image/jpeg',
        name: 'card_photo.jpg',
      };

      formData.append('file', fileData as unknown as Blob);

      const response = await httpClient.post<CardIdentifyResult>('/scan/identify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },
  });
};
