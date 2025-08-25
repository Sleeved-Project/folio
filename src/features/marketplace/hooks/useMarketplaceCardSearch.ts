import { useMarketplaceSearch } from './useMarketplaceSearch';
import { marketplaceSearchService } from '../services/marketplaceSearchService';
import { CardForSale } from '../types';

export function useMarketplaceCardSearch(query: string, enabled: boolean) {
  return useMarketplaceSearch<CardForSale>(
    async (q) => (enabled ? await marketplaceSearchService.searchCards(q) : []),
    query
  );
}
