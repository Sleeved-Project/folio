export interface Set {
  id: string;
  name: string;
  releaseDate?: string;
  imageSymbol: string;
  imageLogo: string;
  nbOwned: number;
  nbTotal: number;
  cardMarketPrice?: number;
  cardMarketTrendingPrice?: string;
  tcgPlayerPrice?: number;
  tcgPlayerTrendingPrice?: string;
}

export interface SetsListResponse {
  data: Set[];
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
