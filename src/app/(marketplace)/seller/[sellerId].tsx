import { useLocalSearchParams } from 'expo-router';

import { StyleSheet, View } from 'react-native';
import { ErrorState } from '../../../components/ui/StatusIndicators';
import ProfileScreen from '../../../features/user/screens/ProfileScreen';
import { theme } from '../../../theme/theme';

export default function SellerProfile() {
  const { sellerId } = useLocalSearchParams();

  if (!sellerId) {
    return <ErrorState message="Missing seller ID" />;
  }

  const sellerIdStr = Array.isArray(sellerId) ? sellerId[0] : sellerId;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <ProfileScreen userId={sellerIdStr} isUserProfile={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
