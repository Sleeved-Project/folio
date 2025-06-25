import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmptyStateCards from '../components/EmptyStateCards';
import CardKPIStats from '../../cards/components/CardKPIStats';
import CardListDisplay from '../../cards/components/CardListDisplay';

export default function MyCardsScreen() {
  const hasCards = true;
  const cardCount = 142;
  const cardMarketValue = 325.5;
  const cardMarketTrend = 'down';
  const tcgPlayerValue = 352.75;
  const tcgPlayerTrend = 'up';

  const myCards = [
    { id: 'base1-1', imageSmall: 'https://images.pokemontcg.io/base1/1.png', occurrences: 1 },
    { id: 'base1-2', imageSmall: 'https://images.pokemontcg.io/base1/2.png', occurrences: 1 },
    { id: 'base1-3', imageSmall: 'https://images.pokemontcg.io/base1/3.png', occurrences: 1 },
    { id: 'base1-4', imageSmall: 'https://images.pokemontcg.io/base1/4.png', occurrences: 1 },
    { id: 'base1-5', imageSmall: 'https://images.pokemontcg.io/base1/5.png', occurrences: 1 },
    { id: 'base1-6', imageSmall: 'https://images.pokemontcg.io/base1/6.png', occurrences: 1 },
  ];

  // Simulate no cards for demonstration purposes
  // In a real application, this would be replaced with actual data fetching logic
  if (!hasCards) {
    return <EmptyStateCards />;
  }

  return (
    <View style={styles.container}>
      <CardListDisplay
        cards={myCards}
        listOrigin="collection"
        ListHeaderComponent={
          <CardKPIStats
            cardCount={cardCount}
            cardMarketValue={cardMarketValue}
            cardMarketTrend={cardMarketTrend}
            tcgPlayerValue={tcgPlayerValue}
            tcgPlayerTrend={tcgPlayerTrend}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
