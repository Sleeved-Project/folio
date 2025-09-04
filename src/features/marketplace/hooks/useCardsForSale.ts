import { useQuery } from '@tanstack/react-query';
import { CardForSale } from '../types';

// TODODELETE : mock data
const mockGetCardsForSale: () => Promise<CardForSale[]> = async () => {
  return [
    {
      id: '1',
      name: 'Card 1',
      finition: 'Foil',
      condition: 'Mint',
      set: 'Set 1',
      price: 100,
      pictureUrl: 'https://images.pokemontcg.io/base1/1.png',
    },
    {
      id: '2',
      name: 'Card 2',
      finition: 'Regular',
      condition: 'Near Mint',
      set: 'Set 2',
      price: 200,
      pictureUrl: 'https://images.pokemontcg.io/base1/2.png',
    },
  ];
};

export const useCardsForSale = () => {
  return useQuery({
    queryKey: ['cardsForSale'],
    queryFn: mockGetCardsForSale,
    enabled: !!mockGetCardsForSale,
  });
};
