import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '../../../components/ui/StatusIndicators';
import AdDetailScreen from '../../../features/marketplace/screens/AdDetailScreen';

export default function AdDetail() {
  const { adId } = useLocalSearchParams();

  if (!adId) {
    return <ErrorState message="Missing ad ID" />;
  }

  return <AdDetailScreen adId={adId as string} />;
}
