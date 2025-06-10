import { useLocalSearchParams } from 'expo-router';
import CardDetail from '../../../features/cards/screens/CardDetail';

export default function CardDetailPage() {
  const { cardId } = useLocalSearchParams();

  return <CardDetail cardId={cardId as string} />;
}
