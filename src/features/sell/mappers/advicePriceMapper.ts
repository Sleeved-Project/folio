export enum CurrencyEnum {
  EUR = '€',
  USD = '$',
}

const UNKNOWN_PRICE = 'unknown';

export function formatAdvicePriceMapper(value: string, curency: CurrencyEnum): string {
  if (value === UNKNOWN_PRICE) return 'Price unavailable';
  return `${value} ${curency}`;
}
