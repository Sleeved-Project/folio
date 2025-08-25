export interface CardForSale {
  id: string;
  name: string;
  finition: string;
  condition: string;
  set: string;
  price: number;
  pictureUrl: string;
}

export interface Seller {
  id: string;
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
  logoUrl: string;
}

export interface Ad {
  id: string;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  condition: string;
  imageRecto: string;
  imageVerso: string;
  seller: Seller;
  certification?: Certification;
}

export interface Offer {
  id: string;
  seller: { id: string; alias: string };
  price: { amount: number; currency: string };
  condition: string;
  thumbnail: string;
}
