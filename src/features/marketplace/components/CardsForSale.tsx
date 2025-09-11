import { StyleSheet, Text, View } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';
import { useAdsList } from '../hooks/queries/useAdsList';
import CardForSaleItem from './CardForSaleItem';

export default function CardsForSale() {
  const theme = useTheme();
  const { data: adsList, isLoading, isError } = useAdsList();

  const adsListFlat = adsList?.pages.flatMap((page) => page.data) ?? [];
  const GAP = 8;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return (
      <View>
        <TitleSection title="Cards for Sale" />
        <View style={[{ marginTop: 8 }]}>
          <View style={[styles.cardsContainer, { gap: GAP }]}></View>
          <Text
            style={[
              styles.text,
              { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md },
            ]}
          >
            Error loading cards
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <TitleSection title="Cards for Sale" />
      <View style={[{ marginTop: 8 }]}>
        <View style={[styles.cardsContainer, { gap: GAP }]}>
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
  text: {
    fontSize: 16,
    color: '#333',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});
