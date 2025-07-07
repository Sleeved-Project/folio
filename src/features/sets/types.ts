export interface Set {
  id: string;
  name: string;
  releaseDate: string;
  imageSymbol: string;
  imageLogo: string;
  nbOwned: number;
  total: number;
}

export interface FormattedSet extends Set {
  totalPercentage: number;
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

export interface FormattedSetsListResponse {
  data: FormattedSet[];
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
    cardMarketPrice: string;
    tcgPlayerPrice: string;
    cardMarketTrending: SetCardPriceTrending;
    tcgPlayerTrending: SetCardPriceTrending;
  };
}

export interface FormattedSetDetailType extends SetDetailType {
  totalPercentage: number;
}
