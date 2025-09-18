import CardsList from '../../features/cards/screens/CardsList';
import ScreenContainer from '../../components/ui/ScreenContainer';

export default function Explorer() {
  return (
    <ScreenContainer title="Explorer">
      <CardsList isFiltersVisible={true} />
    </ScreenContainer>
  );
}
