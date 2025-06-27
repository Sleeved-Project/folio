import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EmptyStateCards from '../components/EmptyStateCards';
import CardKPIStats from '../../cards/components/CardKPIStats';
import CardListDisplay from '../../cards/components/CardListDisplay';
import { useMainFolioStatistics } from '../hooks/queries/useMainFolioStatistics';
import { useAllMyCards } from '../hooks/queries/useAllMyCards';
import { LoadingState } from '../../../components/ui/StatusIndicators';

export default function MyCardsScreen() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useAllMyCards();

  const {
    data: myCardsStats,
    isLoading: isLoadingMyCardsStats,
    error: myCardsStatsError,
    refetch: refetchMyCardsStats,
  } = useMainFolioStatistics();

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchMyCardsStats();
    }, [refetch])
  );

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
            cardCount={myCardsStats?.totalCardsCount}
            cardMarketValue={myCardsStats?.cardMarketPrice}
            cardMarketTrend="neutral"
            tcgPlayerValue={myCardsStats?.tcgPlayerPrice}
            tcgPlayerTrend="neutral"
            isLoading={isLoadingMyCardsStats}
            isError={!!myCardsStatsError}
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
