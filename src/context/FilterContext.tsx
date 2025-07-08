import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FilterOption, Filters } from '../features/filters/types';

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

  // Need to replace to get the actual filters
  const filtersOptions: FilterOption = {
    artists: [
      {
        id: 20,
        name: '"Big Mama" Tagawa',
      },
      {
        id: 169,
        name: '"Big Mama" Tagawa & Benimaru Itoh',
      },
      {
        id: 164,
        name: '"Big Mama" Tagawa, CR CG gangs',
      },
      {
        id: 195,
        name: '0313',
      },
      {
        id: 345,
        name: 'tono',
      },
      {
        id: 275,
        name: 'toriyufu',
      },
      {
        id: 15,
        name: 'Toshinao Aoki',
      },
    ],
    rarities: [
      {
        id: 33,
        label: 'ACE SPEC Rare',
      },
      {
        id: 35,
        label: 'Amazing Rare',
      },
      {
        id: 13,
        label: 'Classic Collection',
      },
      {
        id: 5,
        label: 'Common',
      },
      {
        id: 26,
        label: 'Double Rare',
      },
    ],
    subtypes: [
      {
        id: 14,
        label: 'ACE SPEC',
      },
      {
        id: 32,
        label: 'Ancient',
      },
      {
        id: 6,
        label: 'Baby',
      },
      {
        id: 2,
        label: 'Basic',
      },
    ],
    types: [
      {
        id: 6,
        label: 'Colorless',
      },
      {
        id: 8,
        label: 'Metal',
      },
      {
        id: 1,
        label: 'Psychic',
      },
      {
        id: 4,
        label: 'Water',
      },
    ],
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        selectedFilterOption,
        setSelectedFilterOption,
        filtersOptions,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
