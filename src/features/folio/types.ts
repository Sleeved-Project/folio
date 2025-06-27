import { Card, CardsListResponse } from '../cards/types';

export interface FolioItem {
  id: string;
  name: string;
  cardCount: number;
  cardMarketValue: string;
  tcgPlayerValue: string;
  iconPath?: string;
}

export interface RawMyCard {
  id: string;
  occurrence?: number;
  card?: Partial<Card>;
  [key: string]: unknown;
}

export interface MyCardsListResponse {
  data: RawMyCard[];
  meta: CardsListResponse['meta'];
}

export interface FolioStatisticsData {
  totalCardsCount: number;
  cardMarketPrice: string;
  tcgPlayerPrice: string;
}
