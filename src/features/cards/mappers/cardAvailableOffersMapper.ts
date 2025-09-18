import { CardAvailableOffersResponse } from '../types';

export const cardAvailableOffersMapper = (
  response: CardAvailableOffersResponse
): CardAvailableOffersResponse => {
  return {
    ...response,
    data: response.data.map((ad) => ({
      ...ad,
      originalPrice: ad.originalPrice + '€',
    })),
  };
};
