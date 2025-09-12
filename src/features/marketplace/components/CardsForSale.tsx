import { StyleSheet, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import TitleSection from '../../../components/ui/TitleSection';
import { useAdsList } from '../hooks/queries/useAdsList';
import CardForSaleItem from './CardForSaleItem';

export default function CardsForSale() {
  const { data: adsList, isLoading, error } = useAdsList();

  const adsListFlat = adsList?.pages.flatMap((page) => page.data) ?? [];
  const GAP = 8;

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error?.message} />;

  return (
    <View>
      <TitleSection title="Cards for Sale" />
      <View style={[{ marginTop: 8 }]}>
        <View
          style={{
            gap: GAP,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {adsListFlat?.map((item) => (
            <View key={item.id} style={styles.cardWrapper}>
              <CardForSaleItem item={item} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});
