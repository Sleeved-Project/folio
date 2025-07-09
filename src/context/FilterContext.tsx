import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FilterOption, Filters } from '../features/filters/types';
import { useFilters } from '../features/filters/hooks/queries/useFiltersQuery';

type FilterContextType = {
  filtersOptions: FilterOption;
  selectedFilterOption: FilterOption;
  setSelectedFilterOption?: (option: FilterOption) => void;
  cardFilters?: Filters;
  setCardFilters?: (filters: Filters) => void;
  cardSetFilters?: Filters;
  setCardSetFilters?: (filters: Filters) => void;
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
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(
    {} as FilterOption
  );

  const { data: filtersOptions } = useFilters();

  return (
    <FilterContext.Provider
      value={{
        cardFilters,
        setCardFilters,
        cardSetFilters,
        setCardSetFilters,
        selectedFilterOption,
        setSelectedFilterOption,
        filtersOptions: filtersOptions || ({} as FilterOption),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
