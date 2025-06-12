import { useLocalSearchParams } from 'expo-router';
import CardScanResult from '../../features/scan/screens/CardScanResult';

export default function ScanResult() {
  const { resultType, cards } = useLocalSearchParams();

  return (
    <CardScanResult
      resultType={resultType as 'success' | 'fail'}
      cards={JSON.parse(cards as string) || []}
    />
  );
}
