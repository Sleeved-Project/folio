import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProfilePicture from '../../user/components/profile/ProfilePicture';
import { useAdBuyer } from '../../user/hooks/queries/useAdBuyer';
import { LoadingState, ErrorState } from '../../../components/ui/StatusIndicators';

interface AdBuyerCardProps {
  adId: string;
  style?: object;
}

export default function AdBuyerCard({ adId, style }: AdBuyerCardProps) {
  const theme = useTheme();
  const { data: buyer, isLoading, error } = useAdBuyer(adId);
  console.log('buyer:', buyer);

  if (isLoading) return <LoadingState />;
  if (error || !buyer) return <ErrorState message="Failed to load buyer info." />;

  return (
    <View style={[styles.container, style]}>
      <ProfilePicture username={buyer.username} uri={buyer.profilePictureUrl} size="small" />
      <View style={styles.info}>
        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.bold,
            paddingLeft: 10,
          }}
        >
          {buyer.username}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
});
