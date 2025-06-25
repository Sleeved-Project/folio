import React from 'react';
import { View, StyleSheet } from 'react-native';
import EmptyStateCards from '../components/EmptyStateCards';
import CardKPIStats from '../../cards/components/CardKPIStats';

export default function MyCardsScreen() {
  const hasCards = true;
  const cardCount = 142;
  const cardMarketValue = 325.5;
  const cardMarketTrend = 'down';
  const tcgPlayerValue = 352.75;
  const tcgPlayerTrend = 'up';

  // Simulate no cards for demonstration purposes
  // In a real application, this would be replaced with actual data fetching logic
  if (!hasCards) {
    return <EmptyStateCards />;
  }

  return (
    <View style={styles.container}>
      <CardKPIStats
        cardCount={cardCount}
        cardMarketValue={cardMarketValue}
        cardMarketTrend={cardMarketTrend}
        tcgPlayerValue={tcgPlayerValue}
        tcgPlayerTrend={tcgPlayerTrend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 24,
  },
});
