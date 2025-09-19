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
import CardFilters from '../../filters/components/CardFilters';
import { router } from 'expo-router';
import { useFilterContext } from '../../../context/FilterContext';
import { FilterTypeEnum } from '../../filters/types';

export default function SetDetail({ setId }: { setId: string }) {
  const theme = useTheme();
  const [cardName, setCardName] = React.useState<string>('');
  const { cardSetFilters, filtersOptions, setSelectedFilterOption } = useFilterContext();

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
  } = useSetCards(setId, cardName, cardSetFilters);

  const cards = cardsData?.pages.flatMap((page) => page.data) ?? [];
  const set = setData || ({} as FormattedSetDetailType);

  const toggleFilterDetail = (label: string) => {
    const selected = filtersOptions[label];
    if (!selected) return;
    setSelectedFilterOption?.({
      [label]: selected,
    });
    router.push({
      pathname: '/filter-detail',
      params: {
        filterType: FilterTypeEnum.SET,
      },
    });
  };

  return (
    <View
      style={{ marginBottom: theme.spacing.xl }}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`Set details for ${set?.name || 'this set'}`}
    >
      <View
        style={[styles.setHeader, { marginVertical: theme.spacing.md }]}
        accessible
        accessibilityRole="header"
        accessibilityLabel={`Set ${set?.name || ''}, released in ${set?.releaseDate || ''}`}
      >
        <View style={{ gap: theme.spacing.xs, marginBottom: theme.spacing.md }}>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.xxl,
              fontWeight: theme.typography.fontWeights.bold,
              color: theme.colors.primaryForeground,
            }}
            accessible
            accessibilityRole="text"
            accessibilityLabel={`Set name: ${set.name}`}
          >
            {set.name}
          </Text>
          <Text
            style={{ color: theme.colors.text.secondary }}
            accessible
            accessibilityRole="text"
            accessibilityLabel={`Release date: ${set.releaseDate}`}
          >
            Edited in {set.releaseDate}
          </Text>
        </View>
        <View
          style={[styles.setLogoContainer, { gap: theme.spacing.md }]}
          accessible
          accessibilityRole="image"
          accessibilityLabel={`Progress ${set.totalPercentage || 0}% and symbol of the set`}
        >
          <CircularProgressBar
            size={theme.spacing.xl}
            strokeWidth={8}
            progressPercent={set.totalPercentage}
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
            accessible
            accessibilityRole="image"
            accessibilityLabel={`Set symbol of ${set.name}`}
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
        searchPlaceholder="Search by Pokemon"
        accessibilityLabel="Search cards by Pokemon name"
        accessibilityHint="Enter the name of a Pokemon to filter cards in this set"
      />

      <CardFilters toggleFilterDetail={toggleFilterDetail} filterType={FilterTypeEnum.SET} />

      <View style={{ marginTop: theme.spacing.xl }}>
        <CardListDisplay
          cards={cards}
          hasNextPage={hasNextCardsPage}
          isFetchingNextPage={isFetchingNextCardsPage}
          fetchNextPage={fetchNextCardsPage}
          isLoading={isCardsLoading}
          error={cardsError}
        />
      </View>
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
