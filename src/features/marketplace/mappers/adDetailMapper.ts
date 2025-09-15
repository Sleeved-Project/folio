import { Ad } from '../types';

export const mapAdDetail = (data: Ad): Ad => {
  return {
    ...data,
    originalPrice: data.originalPrice + '€',
  };
};
