import { formatPriceValue } from '../../cards/mappers/cardPricesMapper';
import { Checkout } from '../types';

export function mapCheckoutData(data: Checkout): Checkout {
  return {
    ...data,
    prices: {
      shippingCosts: formatPriceValue(data.prices.shippingCosts, false),
      serviceCosts: formatPriceValue(data.prices.serviceCosts, false),
      totalCosts: formatPriceValue(data.prices.totalCosts, false),
    },
  };
}
