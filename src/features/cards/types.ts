export interface Card {
  id: string;
  imageSmall: string;
  imageLarge?: string;
  bestTrendPrice?: string;
}

export interface CardsListResponse {
  data: Card[];
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

export interface CardBase {
  id: string;
}

export interface CardBasicInfo extends CardBase {
  imageLarge: string;
  number: string;
  set: {
    id: string;
    name: string;
    imageSymbol: string;
  };
}

export interface CardDetailsData {
  flavorText?: string;
  set: {
    id: string;
    releaseDate: string;
  };
  rarity: {
    id: number;
    label: string;
  };
  artist: {
    id: number;
    name: string;
  };
  subtypes?: Array<{
    id: number;
    label: string;
  }>;
}

export interface CardDetailedInfo extends CardBase, CardDetailsData {}

export interface CardDetail extends CardBasicInfo {
  flavorText?: string;
  set: CardBasicInfo['set'] & Partial<CardDetailsData['set']>;
  rarity?: CardDetailsData['rarity'];
  artist?: CardDetailsData['artist'];
  subtypes?: CardDetailsData['subtypes'];
}

export interface PriceData {
  id: string;
  type: 'normal' | 'reverseHolo' | 'holofoil' | string;
  market: string;
}

export interface MarketReporting {
  id: number;
  url: string;
}

export interface CardMarketReporting extends MarketReporting {
  cardMarketPrices: PriceData[];
}

export interface TcgPlayerReporting extends MarketReporting {
  tcgPlayerPrices: PriceData[];
}

export interface CardPricesData {
  id: string;
  cardMarketReporting?: CardMarketReporting;
  tcgPlayerReporting?: TcgPlayerReporting;
}
