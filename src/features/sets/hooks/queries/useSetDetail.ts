import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { SetDetailType } from '../../types';

export const setKeys = {
  all: ['set'] as const,
  details: (id: string) => [...setKeys.all, 'details', id] as const,
};

export const useSetDetailedInfo = (setId: string) => {
  return useQuery({
    queryKey: setKeys.details(setId),
    queryFn: async () => {
      if (!setId) throw new Error('Set ID is required');
      const response = await httpClient.get<SetDetailType>(`/sets/${setId}/details`);
      return response;
    },
    enabled: !!setId,
    staleTime: 5 * 60 * 1000,
  });
};
