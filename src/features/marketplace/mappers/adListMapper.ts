import { Ad, AdsListResponse } from '../types';

export const mapAdList = (data: AdsListResponse): AdsListResponse => {
  return {
    ...data,
    data: data.data.map((ad: Ad) => ({
      ...ad,
      originalPrice: ad.originalPrice + '€',
    })),
  };
};
