import { FolioItem } from '../types';
import { formatNumberShort } from '../../../lib/utils/number';

export function mapFolioList(data: FolioItem[]): FolioItem[] {
  return data.map((folio) => ({
    ...folio,
    statistics: {
      ...folio.statistics,
      cardMarketPrice: `${formatNumberShort(parseFloat(folio.statistics.cardMarketPrice))}€`,
      tcgPlayerPrice: `$${formatNumberShort(parseFloat(folio.statistics.tcgPlayerPrice))}`,
    },
  }));
}
