import { FilterOption, PaginatedFilterOption } from '../types';

export function mapPaginatedFilterOptionToFilterOption(
  paginatedFilterOption: PaginatedFilterOption
): FilterOption {
  const artists = paginatedFilterOption.paginatedArtists.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { paginatedArtists, ...filterOptionWithoutPaginatedArtists } = paginatedFilterOption;
  const filterOption: FilterOption = {
    ...filterOptionWithoutPaginatedArtists,
    artists,
  };
  return filterOption;
}
