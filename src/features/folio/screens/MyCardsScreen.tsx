import { View, StyleSheet } from 'react-native';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';
import EmptyStateCards from '../components/EmptyStateCards';
import CardKPIStats from '../../cards/components/CardKPIStats';
import CardListDisplay from '../../cards/components/CardListDisplay';
import { useMainFolioStatistics } from '../hooks/queries/useMainFolioStatistics';
import { useAllMyCards } from '../hooks/queries/useAllMyCards';
import { LoadingState } from '../../../components/ui/StatusIndicators';

export default function MyCardsScreen() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAllMyCards();

  const {
    data: myCardsStats,
    isLoading: isLoadingMyCardsStats,
    error: myCardsStatsError,
    refetch: refetchMyCardsStats,
  } = useMainFolioStatistics();

  // We need to refetch stats when the screen is focused
  // This is useful when the user navigates back to this screen
  // and we want to ensure the data is up-to-date
  useRefetchOnFocus(refetchMyCardsStats);

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
            cardMarketTrending={myCardsStats?.cardMarketTrending}
            tcgPlayerValue={myCardsStats?.tcgPlayerPrice}
            tcgPlayerTrending={myCardsStats?.tcgPlayerTrending}
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
