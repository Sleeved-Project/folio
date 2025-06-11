import { CardPricesData } from '../types';

export interface FormattedPriceInfo {
  type: string;
  displayType: string;
  formattedPrice: string;
  rawPrice: string;
  currency: 'EUR' | 'USD';
}

export interface FormattedMarketInfo {
  name: string;
  url: string;
  prices: FormattedPriceInfo[];
  currency: 'EUR' | 'USD';
}

export interface FormattedPriceData {
  id: string;
  markets: FormattedMarketInfo[];
  hasData: boolean;
}

/**
 * Formats price type for display
 */
export function formatPriceType(type: string): string {
  switch (type) {
    case 'normal':
      return 'Regular';
    case 'holofoil':
      return 'Holofoil';
    case 'reverseHolo':
    case 'reverseHolofoil':
      return 'Reverse Holofoil';
    case '1stEditionHolofoil':
      return '1st Edition Holofoil';
    case '1stEditionNormal':
      return '1st Edition';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1');
  }
}

/**
 * Formats price value with currency symbol
 */
export function formatPriceValue(price: string, isTcgPlayer = false): string {
  // Handle unknown or invalid price values
  if (price === 'unknown' || isNaN(parseFloat(price))) {
    return 'Not available';
  }

  return isTcgPlayer ? `$${parseFloat(price).toFixed(2)}` : `${parseFloat(price).toFixed(2)}€`;
}

/**
 * Maps raw API price data to a display-friendly format
 */
export function mapCardPricesData(data: CardPricesData): FormattedPriceData {
  const markets: FormattedMarketInfo[] = [];

  // Process CardMarket data if available
  if (data.cardMarketReporting?.cardMarketPrices?.length) {
    markets.push({
      name: 'CardMarket',
      url: data.cardMarketReporting.url,
      currency: 'EUR',
      prices: data.cardMarketReporting.cardMarketPrices.map((price) => ({
        type: price.type,
        displayType: formatPriceType(price.type),
        formattedPrice: formatPriceValue(price.market),
        rawPrice: price.market,
        currency: 'EUR',
      })),
    });
  }

  // Process TCGPlayer data if available
  if (data.tcgPlayerReporting?.tcgPlayerPrices?.length) {
    markets.push({
      name: 'TCGPlayer',
      url: data.tcgPlayerReporting.url,
      currency: 'USD',
      prices: data.tcgPlayerReporting.tcgPlayerPrices.map((price) => ({
        type: price.type,
        displayType: formatPriceType(price.type),
        formattedPrice: formatPriceValue(price.market, true),
        rawPrice: price.market,
        currency: 'USD',
      })),
    });
  }

  return {
    id: data.id,
    markets,
    hasData: markets.length > 0,
  };
}
