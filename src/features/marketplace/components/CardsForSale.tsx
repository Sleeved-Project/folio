import { Pressable, StyleSheet, Text, View } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';
import CardForSaleItem from './CardForSaleItem';
import { useCardsForSale } from '../hooks/useCardsForSale';
import { useRouter } from 'expo-router';

export default function CardsForSale() {
  const theme = useTheme();
  const router = useRouter();
  const { data: cardsForSale, isLoading } = useCardsForSale();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!cardsForSale) {
    return (
      <Text
        style={[
          styles.text,
          { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md },
        ]}
      >
        No cards available
      </Text>
    );
  }

  const GAP = 8;

  return (
    <View>
      <TitleSection title="Cards for Sale" />
      <View style={[{ marginTop: 8 }]}>
        <View style={[styles.cardsContainer, { gap: GAP }]}>
          {cardsForSale?.map((item) => (
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
