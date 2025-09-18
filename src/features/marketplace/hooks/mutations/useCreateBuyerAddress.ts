import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { UpdateBuyerAddressParams } from '../../types';

export const useCreateBuyerAddress = () => {
  return useMutation({
    mutationFn: async ({
      road,
      additionalInfo,
      city,
      zipcode,
      country,
      countrycode,
    }: UpdateBuyerAddressParams) => {
      const response = await httpClient.post<{ message: string }>(`/addresses`, {
        road,
        additionalInfo,
        city,
        zipcode,
        country,
        countrycode,
      });
      return response;
    },
  });
};
