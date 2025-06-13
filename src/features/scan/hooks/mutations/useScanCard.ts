import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { CardScanResult } from '../../types';
import { mapScanResultToCards } from '../../mappers/scanResultsMapper';
import { FormDataFile } from '../../../../lib/client/types';

export const useScanCard = () => {
  return useMutation({
    mutationFn: async (photoPath: string) => {
      const formData = new FormData();

      const fileData: FormDataFile = {
        uri: `file://${photoPath}`,
        type: 'image/jpeg',
        name: 'card_photo.jpg',
      };

      formData.append('file', fileData as unknown as Blob);

      console.log('Sending scan request with formData:', photoPath);

      const response = await httpClient.post<CardScanResult[]>('/scan/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return mapScanResultToCards(response);
    },
  });
};
