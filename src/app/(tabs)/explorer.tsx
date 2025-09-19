import CardsList from '../../features/cards/screens/CardsList';
import ScreenContainer from '../../components/ui/ScreenContainer';

export default function Explorer() {
  return (
    <ScreenContainer
      title="Explorer"
      accessible
      accessibilityLabel="Explorer Screen"
      accessibilityHint="Browse and discover cards"
    >
      <CardsList isFiltersVisible={true} />
    </ScreenContainer>
  );
}
