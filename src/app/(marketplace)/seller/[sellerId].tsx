import { useLocalSearchParams } from 'expo-router';

import { ErrorState } from '../../../components/ui/StatusIndicators';
import ProfileScreen from '../../../features/user/screens/ProfileScreen';

export default function SellerProfile() {
  const { sellerId } = useLocalSearchParams();

  if (!sellerId) {
    return <ErrorState message="Missing seller ID" />;
  }

  const sellerIdStr = Array.isArray(sellerId) ? sellerId[0] : sellerId;

  return <ProfileScreen userId={sellerIdStr} isUserProfile={false} />;
}
