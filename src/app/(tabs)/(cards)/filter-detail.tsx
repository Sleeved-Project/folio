import FilterDetail from '../../../features/filters/components/FilterDetail';
import { FilterTypeEnum } from '../../../features/filters/types';

export default function FilterDetailScreen() {
  return <FilterDetail filterType={FilterTypeEnum.CARD} />;
}
