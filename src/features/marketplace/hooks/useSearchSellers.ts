import { useQuery } from '@tanstack/react-query';

const mockSellersData = [
  { id: 'a', username: 'max___ime', avatarUrl: 'https://i.pravatar.cc/100?img=12' },
  { id: 'b', username: 'karen28', avatarUrl: 'https://i.pravatar.cc/100?img=32' },
];

export const useSearchSellers = (searchQuery: string) => {
  return useQuery({
    queryKey: ['searchSellers', searchQuery],
    queryFn: () => {
      if (!searchQuery) return Promise.resolve([]);
      return Promise.resolve(
        mockSellersData.filter((seller) =>
          seller.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    },
    enabled: !!searchQuery,
  });
};
