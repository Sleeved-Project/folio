import { useMarketplaceSearch } from './useMarketplaceSearch';
import { marketplaceSearchService } from '../services/marketplaceSearchService';
import { SellerItem } from '../types';

export function useMarketplaceSellerSearch(query: string, enabled: boolean) {
  return useMarketplaceSearch<SellerItem>(
    async (q) => (enabled ? await marketplaceSearchService.searchSellers(q) : []),
    query
  );
}
