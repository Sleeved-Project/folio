import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProfilePicture from '../../user/components/profile/ProfilePicture';
import { CheckoutSeller } from '../types';

interface PurchaseRecapSellerCardProps {
  seller: CheckoutSeller;
}

export default function PurchaseRecapSellerCard({ seller }: PurchaseRecapSellerCardProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ProfilePicture username={seller.username} uri={seller.avatarUrl || ''} size="small" />
      <View style={styles.infoContainer}>
        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          {seller.username}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 24,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
});
