import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { FolioItem } from '../../types';
import { mapFolioList } from '../../mappers/folioListMapper';

export const foliosKeys = {
  all: ['folios'] as const,
};

export function useFolios() {
  return useQuery<FolioItem[]>({
    queryKey: foliosKeys.all,
    queryFn: async () => {
      const response = await httpClient.get<FolioItem[]>('/folios');
      return mapFolioList(response);
    },
    staleTime: 5 * 60 * 1000,
  });
}
