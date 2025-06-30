export interface Set {
  id: string;
  name: string;
  releaseDate?: string;
  imageSymbol: string;
  imageLogo: string;
  nbOwned: number;
  total: number;
}

export interface SetsListResponse {
  data: Set[];
  meta: {
    currentPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPage: number;
    lastPageUrl: string;
    nextPageUrl: string | null;
    perPage: number;
    previousPageUrl: string | null;
    total: number;
  };
}

export enum SetCardPriceTrending {
  UP = 'up',
  DOWN = 'down',
  EQUAL = 'equal',
}
export interface SetDetailType extends Set {
  statistics: {
    totalCardsCount: number;
    cardMarketPrice: string;
    tcgPlayerPrice: string;
    cardMarketTrending: SetCardPriceTrending;
    tcgPlayerTrending: SetCardPriceTrending;
  };
}
