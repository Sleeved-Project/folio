import { CardForSale, SellerItem } from '../types';

const mockCards: CardForSale[] = [
  {
    id: '1',
    name: 'Scyther (holo)',
    finition: 'WOTC',
    condition: 'Good',
    set: 'Wizards promo',
    price: 29.33,
    pictureUrl: 'https://images.pokemontcg.io/base1/10.png',
  },
  {
    id: '2',
    name: 'Charizard',
    finition: 'WOTC',
    condition: 'Near Mint',
    set: 'Base Set',
    price: 299.99,
    pictureUrl: 'https://images.pokemontcg.io/base1/4.png',
  },
];

const mockSellers: SellerItem[] = [
  { id: 'a', username: 'max___ime', avatarUrl: 'https://i.pravatar.cc/100?img=12' },
  { id: 'b', username: 'karen28', avatarUrl: 'https://i.pravatar.cc/100?img=32' },
];

export const marketplaceSearchService = {
  async searchCards(query: string): Promise<CardForSale[]> {
    await new Promise((r) => setTimeout(r, 300));
    const q = query.toLowerCase();
    return mockCards.filter((c) => c.name.toLowerCase().includes(q));
  },
  async searchSellers(query: string): Promise<SellerItem[]> {
    await new Promise((r) => setTimeout(r, 300));
    const q = query.toLowerCase();
    return mockSellers.filter((s) => s.username.toLowerCase().includes(q));
  },
};
