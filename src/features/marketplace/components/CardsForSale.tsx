import { FlatList, StyleSheet, Text, View } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';
import CardForSaleItem from './CardForSaleItem';

export default function CardsForSale() {
  const theme = useTheme();

  // TODODELETE: Replace with hook fetch data from API
  const cardsForSale = [
    {
      id: '1',
      name: 'Card A',
      price: 10,
      pictureUrl: 'https://images.pokemontcg.io/base1/1.png',
      set: 'Base Set',
      finition: 'Holo',
      condition: 'Good',
    },
    {
      id: '2',
      name: 'Card B',
      price: 15,
      pictureUrl: 'https://images.pokemontcg.io/base1/2.png',
      set: 'Base Set',
      finition: 'Non-Holo',
      condition: 'Near Mint',
    },
    {
      id: '3',
      name: 'Card C',
      price: 20,
      pictureUrl: 'https://images.pokemontcg.io/base1/3.png',
      set: 'Base Set',
      finition: 'Reverse Holo',
      condition: 'Mint',
    },
    {
      id: '4',
      name: 'Card D',
      price: 25,
      pictureUrl: 'https://images.pokemontcg.io/base1/4.png',
      set: 'Base Set',
      finition: 'Holo',
      condition: 'Lightly Played',
    },
    {
      id: '5',
      name: 'Card E',
      price: 30,
      pictureUrl: 'https://images.pokemontcg.io/base1/5.png',
      set: 'Base Set',
      finition: 'Non-Holo',
      condition: 'Played',
    },
    {
      id: '6',
      name: 'Card F',
      price: 35,
      pictureUrl: 'https://images.pokemontcg.io/base1/6.png',
      set: 'Base Set',
      finition: 'Reverse Holo',
      condition: 'Damaged',
    },
  ];

  const GAP = 8;

  return (
    <View>
      <TitleSection title="Cards for Sale" />
      <View style={[{ marginTop: 8 }]}>
        <FlatList
          data={cardsForSale}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CardForSaleItem item={item} />}
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
  text: {
    fontSize: 16,
    color: '#333',
  },
});
