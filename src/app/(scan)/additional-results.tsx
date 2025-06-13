import { useLocalSearchParams } from 'expo-router';
import AdditionalResultsScan from '../../features/scan/screens/AdditionalResultsScan';

export default function AdditionalResults() {
  const { cards } = useLocalSearchParams();

  return <AdditionalResultsScan cards={JSON.parse(cards as string)} />;
}
