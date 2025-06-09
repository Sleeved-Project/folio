export interface Card {
  id: string;
  imageSmall: string;
}
export interface CardsListResponse {
  data: Card[];
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
