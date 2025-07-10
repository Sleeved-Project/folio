import { useLocalSearchParams } from 'expo-router';
import { FilterTypeEnum } from '../features/filters/types';
import FilterDetail from '../features/filters/components/FilterDetail';

export default function FilterDetailScreen() {
  const filterType = useLocalSearchParams().filterType as FilterTypeEnum;
  if (!filterType) {
    throw new Error('Filter type is required');
  }
  return <FilterDetail filterType={filterType} />;
}
