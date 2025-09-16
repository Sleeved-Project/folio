import { ScrollView, StyleSheet, View } from 'react-native';
import { LoadingScreen } from '../../../../components/ui/LoadingScreen';
import { ErrorState } from '../../../../components/ui/StatusIndicators';
import CardForSaleItem from '../../../marketplace/components/CardForSaleItem';
import { useUserAds } from '../../hooks/queries/useUserInfo';

interface UserAdListProps {
  userId: string;
}

export default function UserAdList({ userId }: UserAdListProps) {
  const { data: ads, isLoading, error } = useUserAds(userId);
  const adsListFlat = ads?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorState message={error.message} />;

  const GAP = 8;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          gap: GAP,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <>
          {adsListFlat?.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <CardForSaleItem item={item} />
            </View>
          ))}
        </>
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
