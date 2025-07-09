import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { FilterOption } from '../../types';

export const filterKeys = {
  all: ['filter'] as const,
};

export const useFilters = () => {
  return useQuery({
    queryKey: ['filter'],
    queryFn: async () => {
      const response = await httpClient.get<FilterOption>(`/filters/cards`);
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });
};
