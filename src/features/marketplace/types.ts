export interface CardForSale {
  id: string;
  name: string;
  finition: string;
  condition: string;
  set: string;
  price: number;
  pictureUrl: string;
}

export type SellerItem = {
  id: string | number;
  username: string;
  avatarUrl?: string;
};
