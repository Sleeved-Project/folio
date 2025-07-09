import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { FormattedSetDetailType } from '../types';
import CircularProgressBar from '../components/CircularProgressBar';
import SearchBar from '../../../components/ui/SearchBar';
import CardListDisplay from '../../cards/components/CardListDisplay';
import CardKPIStats from '../../cards/components/CardKPIStats';
import { useSetDetailedInfo } from '../hooks/queries/useSetsQuery';
import { useSetCards } from '../hooks/queries/useSetCards';

export default function SetDetail({ setId }: { setId: string }) {
  const theme = useTheme();
  const [cardName, setCardName] = React.useState<string>('');

  const {
    data: setData,
    isLoading: isLoadingBasic,
    error: basicError,
  } = useSetDetailedInfo(setId as string);

  const {
    data: cardsData,
    isLoading: isCardsLoading,
    error: cardsError,
    fetchNextPage: fetchNextCardsPage,
    hasNextPage: hasNextCardsPage,
    isFetchingNextPage: isFetchingNextCardsPage,
  } = useSetCards(setId, cardName);

  const cards = cardsData?.pages.flatMap((page) => page.data) ?? [];
  const set = setData || ({} as FormattedSetDetailType);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
          paddingTop: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          gap: theme.spacing.md,
        },
      ]}
    >
      <View style={[styles.setHeader]}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.text.primary }}>
            {set.name}
          </Text>
          <Text style={{ color: theme.colors.text.secondary }}>Edited in {set.releaseDate}</Text>
        </View>
        <View style={[styles.setLogoContainer, { gap: theme.spacing.md }]}>
          <CircularProgressBar
            size={theme.spacing.xl}
            strokeWidth={8}
            progressPercent={set.totalPercentage}
            bgColor={'grey'}
            pgColor={'black'}
          />
          <Image
            source={{ uri: set.imageSymbol }}
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width: theme.spacing.xxl,
              height: theme.spacing.xxl,
              borderRadius: theme.borderRadius.medium,
            }}
          />
        </View>
      </View>
      <CardKPIStats
        cardCount={set?.total}
        cardMarketValue={set?.statistics?.cardMarketPrice?.toString()}
        cardMarketTrending={set?.statistics?.cardMarketTrending}
        tcgPlayerValue={set?.statistics?.tcgPlayerPrice?.toString()}
        tcgPlayerTrending={set?.statistics?.tcgPlayerTrending}
        isLoading={isLoadingBasic}
        isError={!!basicError}
      />
      <SearchBar
        searchQuery={cardName}
        setSearchQuery={(newName: string) => setCardName(newName)}
      />
      {/* Add the filters here */}
      <CardListDisplay
        cards={cards}
        hasNextPage={hasNextCardsPage}
        isFetchingNextPage={isFetchingNextCardsPage}
        fetchNextPage={fetchNextCardsPage}
        isLoading={isCardsLoading}
        error={cardsError}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
