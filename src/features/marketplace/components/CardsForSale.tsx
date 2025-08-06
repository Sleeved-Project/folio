import { FlatList, Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';

export default function CardsForSale() {
  const theme = useTheme();

  // TODODELETE: Replace with hook fetch data from API
  const cardsForSale = [
    {
      id: 1,
      name: 'Card A',
      price: 10,
      pictureUrl: 'https://images.pokemontcg.io/base1/1.png',
      finition: 'Holo',
      condition: 'Good',
    },
    {
      id: 2,
      name: 'Card B',
      price: 15,
      pictureUrl: 'https://images.pokemontcg.io/base1/2.png',
      finition: 'Non-Holo',
      condition: 'Near Mint',
    },
  ];

  const width = useWindowDimensions().width - 32;
  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
  const CARD_HEIGHT = CARD_WIDTH * 1.36;

  return (
    <View>
      <TitleSection title="Cards for Sale" />
      <View style={[{ marginTop: 8 }]}>
        <FlatList
          data={cardsForSale}
          scrollEnabled={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardItem}>
              <View style={{ position: 'relative' }}>
                <Image
                  source={{ uri: item.pictureUrl }}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    borderRadius: theme.borderRadius.medium,
                  }}
                />
                <Text
                  style={[
                    styles.conditionText,
                    {
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      fontSize: theme.typography.fontSizes.sm,
                      fontWeight: theme.typography.fontWeights.bold,
                    },
                  ]}
                >
                  {item.condition}
                </Text>
              </View>
              <Text
                style={[
                  styles.cardName,
                  {
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSizes.lg,
                    fontWeight: theme.typography.fontWeights.bold,
                    marginTop: 8,
                  },
                ]}
              >
                {item.name} ({item.finition})
              </Text>
              <Text style={[{ color: theme.colors.text.secondary }]}>Wizard promo</Text>
              <Text style={[styles.cardPrice, { fontWeight: theme.typography.fontWeights.bold }]}>
                ${item.price}
              </Text>
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={{ marginBottom: GAP * 2, justifyContent: 'space-between' }}
          ListEmptyComponent={() => (
            <Text
              style={[
                styles.text,
                { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md },
              ]}
            >
              No cards available
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 16,
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    color: '#808080',
  },
  text: {
    textAlign: 'center',
    padding: 16,
  },
  conditionText: {
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 100,
    color: '#333',
  },
});
