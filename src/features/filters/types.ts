export type Filter = {
  label: string;
  values: number[];
};

export type Filters = Filter[] | undefined;

export type FilterOption = {
  [key: string]: { id: number; name: string }[] | { id: number; label: string }[];
};
