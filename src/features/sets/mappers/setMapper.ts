import {
  FormattedSet,
  FormattedSetDetailType,
  Set,
  SetCardPriceTrending,
  SetDetailType,
} from '../types';

export function formatTotalPercentage(nbOwned: number, total: number): number {
  if (!total || total === 0 || !nbOwned || nbOwned === 0) {
    return 0;
  }
  const percentage = (nbOwned / total) * 100;
  return Number(percentage.toFixed(2));
}

export function formatReleaseDate(date: string): string {
  if (!date) {
    return 'Unknown release date';
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

export function mapSetDetailData(data: SetDetailType): FormattedSetDetailType {
  return {
    id: data.id,
    name: data.name,
    releaseDate: formatReleaseDate(data.releaseDate),
    imageSymbol: data.imageSymbol,
    imageLogo: data.imageLogo,
    nbOwned: data.nbOwned,
    total: data.total,
    totalPercentage: formatTotalPercentage(data.nbOwned, data.total),
    statistics: {
      totalCardsCount: data.statistics.totalCardsCount,
      cardMarketPrice: data.statistics.cardMarketPrice,
      tcgPlayerPrice: data.statistics.tcgPlayerPrice,
      cardMarketTrending: data.statistics.cardMarketTrending as SetCardPriceTrending,
      tcgPlayerTrending: data.statistics.tcgPlayerTrending as SetCardPriceTrending,
    },
  };
}

export function mapSetData(data: Set): FormattedSet {
  return {
    id: data.id,
    name: data.name,
    releaseDate: formatReleaseDate(data.releaseDate),
    imageSymbol: data.imageSymbol,
    imageLogo: data.imageLogo,
    nbOwned: data.nbOwned,
    total: data.total,
    totalPercentage: formatTotalPercentage(data.nbOwned, data.total),
  };
}
