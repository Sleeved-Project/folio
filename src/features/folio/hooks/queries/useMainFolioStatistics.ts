import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../../lib/client/http-client';
import { FolioStatisticsData } from '../../types';
import { mapFolioStatistics } from '../../mappers/folioStatisticsMapper';

export const folioStatisticsKey = ['folio', 'statistics'];

export function useMainFolioStatistics() {
  return useQuery({
    queryKey: folioStatisticsKey,
    queryFn: async () => {
      const response = await httpClient.get<FolioStatisticsData>('/folios/statistics');
      return mapFolioStatistics(response);
    },
    staleTime: 5 * 60 * 1000,
  });
}
