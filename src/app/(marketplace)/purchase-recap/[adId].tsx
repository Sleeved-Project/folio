import { useLocalSearchParams } from 'expo-router';
import { ErrorState } from '../../../components/ui/StatusIndicators';
import PurchaseRecapScreen from '../../../features/marketplace/screens/PurchaseRecapScreen';

export default function PurchaseRecap() {
  const { adId } = useLocalSearchParams();

  if (!adId) {
    return <ErrorState message="Missing ad ID" />;
  }

  return <PurchaseRecapScreen adId={adId as string} />;
}
