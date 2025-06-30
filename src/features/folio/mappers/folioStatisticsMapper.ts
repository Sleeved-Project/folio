import { formatNumberShort } from '../../../lib/utils/number';
import { FolioStatisticsData } from '../types';

export function mapFolioStatistics(data: FolioStatisticsData): FolioStatisticsData {
  return {
    totalCardsCount: data.totalCardsCount,
    cardMarketPrice: `${formatNumberShort(parseFloat(data.cardMarketPrice))}€`,
    tcgPlayerPrice: `$${formatNumberShort(parseFloat(data.tcgPlayerPrice))}`,
    cardMarketTrending: data.cardMarketTrending,
    tcgPlayerTrending: data.tcgPlayerTrending,
  };
}
