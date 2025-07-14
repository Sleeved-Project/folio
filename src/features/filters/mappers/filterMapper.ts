import { FilterOption, PaginatedFilterOption } from '../types';

export function mapPaginatedFilterOptionToFilterOption(
  paginatedFilterOption: PaginatedFilterOption
): FilterOption {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { meta, ...filterOption } = paginatedFilterOption;
  return filterOption;
}
