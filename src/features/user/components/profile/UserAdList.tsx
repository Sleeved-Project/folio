import { ScrollView, StyleSheet, View } from 'react-native';
import { LoadingScreen } from '../../../../components/ui/LoadingScreen';
import { ErrorState } from '../../../../components/ui/StatusIndicators';
import CardForSaleItem from '../../../marketplace/components/CardForSaleItem';
import { useUserAds } from '../../hooks/queries/useUserInfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface UserAdListProps {
  userId: string;
}

export default function UserAdList({ userId }: UserAdListProps) {
  const { data: ads, isLoading, error } = useUserAds(userId);
  const adsListFlat = ads?.pages.flatMap((page) => page.data) ?? [];
  const insets = useSafeAreaInsets();

  if (isLoading) return <LoadingScreen showLogo />;
  if (error) return <ErrorState message={error.message} />;

  const GAP = 8;

  return (
    <ScrollView
      style={{ paddingBottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
      accessible
      accessibilityLabel="User Ads List"
      accessibilityHint="Scroll through all ads posted by this user"
    >
      <View
        style={{
          gap: GAP,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {adsListFlat?.map((item) => (
          <View
            key={item.id}
            style={styles.cardWrapper}
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Ad: ${item.card.name ?? 'Untitled'}`}
            accessibilityHint="View details for this ad"
          >
            <CardForSaleItem item={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});
