export type Filter = {
  label: string;
  values: number[];
};

export type Filters = Filter[] | undefined;

export type FilterOption = {
  [key: string]: { id: number; value: string }[];
};

export enum FilterTypeEnum {
  CARD = 'card',
  SET = 'set',
}
