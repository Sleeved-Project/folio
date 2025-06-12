import { useLocalSearchParams } from 'expo-router';
import CardScanResult from '../../features/scan/screens/CardScanResult';

export default function ScanResult() {
  const { resultType, cards } = useLocalSearchParams();

  const parsedCards = cards ? JSON.parse(cards as string) : [];

  return <CardScanResult resultType={resultType as 'success' | 'fail'} cards={parsedCards} />;
}
