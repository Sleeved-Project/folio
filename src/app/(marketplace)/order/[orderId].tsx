import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '../../../components/ui/StatusIndicators';
import OrderDetailScreen from '../../../features/marketplace/screens/OrderDetailScreen';

export default function OrderDetail() {
  const { orderId } = useLocalSearchParams();

  if (!orderId) {
    return <ErrorState message="Missing order ID" />;
  }

  return <OrderDetailScreen orderId={orderId as string} />;
}
