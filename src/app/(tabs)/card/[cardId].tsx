import { useLocalSearchParams } from 'expo-router';
import CardDetail from '../../../features/cards/screens/CardDetail';
import { ErrorState } from '../../../components/ui/StatusIndicators';

export default function CardDetailPage() {
  const { cardId } = useLocalSearchParams();

  if (!cardId) {
    return <ErrorState message="Missing card ID" />;
  }

  return <CardDetail cardId={cardId as string} />;
}
