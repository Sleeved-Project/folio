import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { UpdateBuyerAddressParams } from '../../types';

export const useBuyerDeliveryAddress = () => {
  return useMutation({
    mutationFn: async ({
      address,
      additionalInfo,
      city,
      zipCode,
      country,
      countryCode,
    }: UpdateBuyerAddressParams) => {
      const response = await httpClient.post<boolean>(`/me/address`, {
        address,
        additionalInfo,
        city,
        zipCode,
        country,
        countryCode,
      });
      return response;
    },
  });
};
