import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FilterOption, Filters } from '../features/filters/types';
import { useFilters } from '../features/filters/hooks/queries/useFiltersQuery';

type FilterContextType = {
  removeAllFilters: () => void;
  filtersOptions: FilterOption;
  selectedFilterOption: FilterOption;
  setSelectedFilterOption?: (option: FilterOption) => void;
  cardFilters?: Filters;
  setCardFilters?: (filters: Filters) => void;
  cardSetFilters?: Filters;
  setCardSetFilters?: (filters: Filters) => void;
  artistName: string;
  setArtistName: (name: string) => void;
  isLoading: boolean;
  error: Error | null;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilterContext must be used within a FilterProvider');
  return ctx;
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [cardFilters, setCardFilters] = useState<Filters>([]);
  const [cardSetFilters, setCardSetFilters] = useState<Filters>([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>({});
  const [artistName, setArtistName] = useState<string>('');
  const {
    data: filtersOptionsData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFilters(artistName);

  const allFilterOptions = filtersOptionsData?.pages.reduce((acc, page) => {
    const merged = { ...acc };

    // If artists exist, merge them with the new page's artists
    if (page.artists) {
      merged.artists = [
        ...(acc.artists || []),
        ...page.artists.filter(
          (newArtist) => !(acc.artists || []).some((a) => a.id === newArtist.id)
        ),
      ];
    }

    // Merge other keys shallowly as we don't need have pagination for them
    for (const key in page) {
      if (key !== 'artists') {
        merged[key] = page[key];
      }
    }

    return merged;
  }, {} as FilterOption);

  useEffect(() => {
    if (selectedFilterOption.artists && allFilterOptions?.artists) {
      setSelectedFilterOption({
        artists: allFilterOptions.artists,
      });
    }
  }, [filtersOptionsData]);

  const removeAllFilters = () => {
    setCardFilters([]);
    setCardSetFilters([]);
    setSelectedFilterOption({} as FilterOption);
  };

  return (
    <FilterContext.Provider
      value={{
        cardFilters,
        setCardFilters,
        cardSetFilters,
        setCardSetFilters,
        selectedFilterOption,
        setSelectedFilterOption,
        removeAllFilters,
        filtersOptions: allFilterOptions || {},
        artistName,
        setArtistName,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
