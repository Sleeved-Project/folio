import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EmptyStateCards from '../components/EmptyStateCards';
import CardKPIStats from '../../cards/components/CardKPIStats';
import CardListDisplay from '../../cards/components/CardListDisplay';
import { useAllMyCards } from '../hooks/queries/useAllMyCards';
import { LoadingState } from '../../../components/ui/StatusIndicators';

export default function MyCardsScreen() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useAllMyCards();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const cardCount = 142;
  const cardMarketValue = 325.5;
  const cardMarketTrend = 'down';
  const tcgPlayerValue = 352.75;
  const tcgPlayerTrend = 'up';

  const cardsData = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isLoading && cardsData?.length === 0) {
    return <EmptyStateCards />;
  }

  return (
    <View style={styles.container}>
      <CardListDisplay
        cards={cardsData}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        error={error}
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
