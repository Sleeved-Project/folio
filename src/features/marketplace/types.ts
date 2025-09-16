import { ImageSourcePropType } from 'react-native';
import { LabelItem } from '../../types';

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
  id: string;
  centeringRating: string;
  certifiedAt: string;
  cornerRating: string;
  edgeRating: string;
  globalRating: string;
  surfaceRating: string;
}

export interface Authority {
  name: string;
  logo: ImageSourcePropType;
}

export interface Ad {
  id: string;
  originalPrice: string;
  rectoImageUrl: string;
  versoImageUrl: string;
  condition: Condition;
  finish: Finish;
  card: AdCard;
  status: { id: string; label: string };
  certificate?: Certification;
  seller: Seller;
  createdAt: string;
  updatedAt: string;
}

export interface AdCard {
  id: string;
  name: string;
  imageSmall: string;
  imageLarge?: string;
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

export type Condition = LabelItem;

export type Finish = LabelItem;

export interface SellerItem {
  id: string;
  username: string;
  avatarUrl?: string;
}

export interface UsersListResponse {
  data: Seller[];
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

export enum AdStatusEnum {
  PUBLISHED = 'Published',
  SOLD = 'Sold',
  ARCHIVED = 'Archived',
  DRAFT = 'Draft',
}
