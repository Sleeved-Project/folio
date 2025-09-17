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

export interface Checkout {
  id: string;
  ad: CheckoutAd;
  prices: CheckoutPrice;
}
export interface CheckoutAd {
  id: string;
  originalPrice: string;
  condition: Condition;
  rectoImageUrl: string;
  finish: Finish;
  card: {
    name: string;
  };
  status: { id: string; label: string };
  deliveryAddress: {
    id: string;
  };
  certificate?: Certification;
  seller: CheckoutSeller;
}
export interface CheckoutCertificate {
  grade: {
    label: string;
  };
  global_rating: string;
}
export interface CheckoutSeller {
  id: string;
  username: string;
  avatarUrl?: string;
}

export interface CheckoutPrice {
  shippingCost: string;
  serviceCost: string;
  totalCost: string;
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

export interface UpdateBuyerAddressParams {
  address: string;
  additionalInfo?: string;
  city: string;
  zipCode: string;
  country: string;
  countryCode: string;
}

export interface Address {
  address: string;
  additionalInfo: string;
  city: string;
  zipCode: string;
  country: string;
  countryCode: string;
}
