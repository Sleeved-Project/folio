import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Set } from '../types';
import CircularProgressBar from '../components/CircularProgressBar';
import SearchBar from '../../../components/ui/SearchBar';
import { useCards } from '../../cards/hooks/queries/useCardsQuery';
import CardListDisplay from '../../cards/components/CardListDisplay';
import CardKPIStats from '../../cards/components/CardKPIStats';

export default function SetDetail({ setId }: { setId: string }) {
  const theme = useTheme();
  const [cardName, setCardName] = React.useState<string>('');
  const set: Set = {
    id: setId,
    name: 'Example Set',
    releaseDate: '1999-01-09',
    imageLogo: 'https://images.pokemontcg.io/base1/logo.png',
    imageSymbol: 'https://images.pokemontcg.io/base1/symbol.png',
    nbOwned: 2,
    nbTotal: 20,
    cardMarketPrice: 10.0,
    cardMarketTrendingPrice: 'up',
    tcgPlayerPrice: 12.0,
    tcgPlayerTrendingPrice: 'down',
  };

  const formattedReleaseDate = set.releaseDate
    ? new Date(set.releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown release date';

  const {
    data: cardsData,
    isLoading: isCardsLoading,
    error: cardsError,
    fetchNextPage: fetchNextCardsPage,
    hasNextPage: hasNextCardsPage,
    isFetchingNextPage: isFetchingNextCardsPage,
  } = useCards(cardName);
  const cards = cardsData?.pages.flatMap((page) => page.data) ?? [];

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
          <Text style={{ color: theme.colors.text.secondary }}>
            Edited in {formattedReleaseDate}
          </Text>
        </View>
        <View style={[styles.setLogoContainer, { gap: theme.spacing.md }]}>
          <CircularProgressBar
            size={theme.spacing.xl}
            strokeWidth={8}
            progressPercent={(set.nbOwned / set.nbTotal) * 100}
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
              ...theme.shadows.small,
            }}
          />
        </View>
      </View>
      <CardKPIStats
        cardCount={set.nbOwned}
        cardMarketValue={set.cardMarketPrice?.toString()}
        cardMarketTrending={set.cardMarketTrendingPrice === 'up' ? 'up' : 'down'}
        tcgPlayerValue={set.tcgPlayerPrice?.toString()}
        tcgPlayerTrending={set.tcgPlayerTrendingPrice === 'up' ? 'up' : 'down'}
        isLoading={isCardsLoading}
        isError={!!cardsError}
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
        isLoading={isCardsLoading}
        fetchNextPage={fetchNextCardsPage}
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
