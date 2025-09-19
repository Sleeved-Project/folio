import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { ErrorState } from '../../../components/ui/StatusIndicators';
import ProfileScreen from '../../../features/user/screens/ProfileScreen';
import { useTheme } from '../../../theme/useTheme';

export default function SellerProfile() {
  const { sellerId } = useLocalSearchParams();
  const theme = useTheme();

  if (!sellerId) {
    return <ErrorState message="Missing seller ID" />;
  }

  const sellerIdStr = Array.isArray(sellerId) ? sellerId[0] : sellerId;

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.background.primary }}
      accessible
      accessibilityLabel="Seller Profile Screen"
      accessibilityHint="Displays the profile information and ads of the selected seller"
    >
      <ProfileScreen userId={sellerIdStr} isUserProfile={false} />
    </View>
  );
}
