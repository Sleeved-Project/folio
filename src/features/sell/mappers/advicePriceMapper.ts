export enum CurrencyEnum {
  EUR = '€',
  USD = '$',
}

export function formatAdvicePriceMapper(value: string, curency: CurrencyEnum): string {
  return `${value} ${curency}`;
}
