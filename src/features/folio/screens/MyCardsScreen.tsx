import { View, StyleSheet } from 'react-native';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';
import { Card } from '../../cards/types';
import CardKPIStats from '../../cards/components/CardKPIStats';
import CardListDisplay from '../../cards/components/CardListDisplay';
import { useMainFolioStatistics } from '../hooks/queries/useMainFolioStatistics';
import { useTheme } from '../../../theme/useTheme';

interface MyCardsScreenProps {
  myCardsData: Card[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  error?: Error | null;
}

export default function MyCardsScreen({
  myCardsData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  error,
}: MyCardsScreenProps) {
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
  const theme = useTheme();

  return (
    <View style={[styles.container]}>
      <CardListDisplay
        cards={myCardsData}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        error={error}
        listOrigin="collection"
        ListHeaderComponent={
          <View style={{ marginBottom: theme.spacing.xl }}>
            <CardKPIStats
              cardCount={myCardsStats?.totalCardsCount}
              cardMarketValue={myCardsStats?.cardMarketPrice}
              cardMarketTrending={myCardsStats?.cardMarketTrending}
              tcgPlayerValue={myCardsStats?.tcgPlayerPrice}
              tcgPlayerTrending={myCardsStats?.tcgPlayerTrending}
              isLoading={isLoadingMyCardsStats}
              isError={!!myCardsStatsError}
            />
          </View>
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
