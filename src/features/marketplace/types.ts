import { ImageSourcePropType } from 'react-native';
import { Card } from '../cards/types';

export interface HasStripeAccountResponse {
  hasStripeAccount: boolean;
}

export interface Seller {
  id: string;
  username: string;
  alias: string;
  flag: string;
  avatarUrl: string;
  rating: number;
  ratingCount: number;
}

export interface Certification {
  authority: Authority;
  grade: number;
  label: string;
}

export interface Authority {
  name: string;
  logo: ImageSourcePropType;
}

export interface Ad {
  id: string;
  originalPrice: number;
  rectoImageUrl: string;
  versoImageUrl: string;
  status: string;
  condition: string;
  finish: string;
  card: Card;
  certificate?: Certification;
  seller: Seller;
  createdAt: string;
  updatedAt: string;
}

export interface AdsListResponse {
  data: Ad[];
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

export type SellerItem = {
  id: string;
  username: string;
  avatarUrl: string;
};
