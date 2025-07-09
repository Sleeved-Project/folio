import FilterDetail from '../../../features/filters/components/FilterDetail';
import { FilterTypeEnum } from '../../../features/filters/types';

export default function FilterSetCardsDetailScreen() {
  return <FilterDetail filterType={FilterTypeEnum.SET} />;
}
