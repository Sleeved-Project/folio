import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';
import CardForSaleItem from './CardForSaleItem';
import { useAdsList } from '../hooks/queries/useAdsList';

export default function CardsForSale() {
  const theme = useTheme();
  const router = useRouter();
  const { data: adsList, isLoading, isError } = useAdsList();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const adsListFlat = adsList?.pages.flatMap((page) => page.data) ?? [];

  const GAP = 8;

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
              <Pressable onPress={() => router.push(`/ad/${item.id}`)}>
                <CardForSaleItem item={item} />
              </Pressable>
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
