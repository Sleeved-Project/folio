import { Ad, AdsListResponse } from '../types';

export const mapAdList = (response: AdsListResponse): AdsListResponse => {
  return {
    ...response,
    data: response.data.map((ad: Ad) => ({
      ...ad,
      originalPrice: ad.originalPrice + '€',
    })),
  };
};
