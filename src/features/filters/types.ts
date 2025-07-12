export type Filter = {
  label: string;
  values: number[];
};

export type Filters = Filter[] | undefined;

export type FilterGroup = {
  id: number;
  value: string;
}[];

export type PaginatedFilterOption = {
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
  };
} & {
  [key: string]: FilterGroup;
};

export type FilterOption = {
  [key: string]: FilterGroup;
};

export enum FilterTypeEnum {
  CARD = 'card',
  SET = 'set',
}
