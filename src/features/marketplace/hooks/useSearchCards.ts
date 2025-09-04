import { useQuery } from '@tanstack/react-query';

// TODODELETE : mock data
const mockCardsData = [
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

export const useSearchCardsForSale = (searchQuery: string) => {
  return useQuery({
    queryKey: ['searchCardsForSale', searchQuery],
    queryFn: () => {
      if (!searchQuery) return Promise.resolve([]);
      return Promise.resolve(
        mockCardsData.filter((card) => card.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    },
    enabled: !!searchQuery,
  });
};
