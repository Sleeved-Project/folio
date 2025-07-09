import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FilterOption, Filters } from '../features/filters/types';
import { useFilters } from '../features/filters/hooks/queries/useFiltersQuery';

type FilterContextType = {
  filtersOptions: FilterOption;
  selectedFilterOption: FilterOption;
  filters?: Filters;
  setFilters?: (filters: Filters) => void;
  setSelectedFilterOption?: (option: FilterOption) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilterContext must be used within a FilterProvider');
  return ctx;
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>([]);
  const [selectedFilterOption, setSelectedFilterOption] = useState<FilterOption>(
    {} as FilterOption
  );

  const { data: filtersOptions } = useFilters();

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        selectedFilterOption,
        setSelectedFilterOption,
        filtersOptions: filtersOptions || ({} as FilterOption),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
