import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Set } from '../types';
import CircularProgressBar from '../components/CircularProgressBar';
import { TrendingDown, TrendingUp } from 'lucide-react-native';
import SearchBar from '../../../components/ui/SearchBar';
import { useCards } from '../../cards/hooks/queries/useCardsQuery';
import CardListDisplay from '../../cards/components/CardListDisplay';

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
      <View
        style={[
          styles.setDetailsContainer,
          {
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.medium,
            backgroundColor: theme.colors.background.tertiary,
          },
        ]}
      >
        <View style={[styles.setDetails]}>
          <View style={[styles.setDetailsInfo]}>
            <Text
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              Owned Cards
            </Text>
            <Text
              style={{
                color: theme.colors.text.black,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              {set.nbOwned} out of {set.nbTotal}
            </Text>
          </View>
          <CircularProgressBar
            size={theme.spacing.xl}
            strokeWidth={8}
            progressPercent={(set.nbOwned / set.nbTotal) * 100}
            bgColor={'grey'}
            pgColor={'black'}
          />
        </View>
        <View style={[styles.setDetails]}>
          <View style={[styles.setDetailsInfo]}>
            <Text
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              Card Market Price
            </Text>
            <Text
              style={{
                color: theme.colors.text.black,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              {set.cardMarketPrice?.toFixed(2)}€
            </Text>
          </View>
          {set.cardMarketTrendingPrice === 'up' ? (
            <TrendingUp size={24} color={theme.colors.success} />
          ) : (
            <TrendingDown size={24} color={theme.colors.danger} />
          )}
        </View>
        <View style={[styles.setDetails]}>
          <View style={[styles.setDetailsInfo]}>
            <Text
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              Tcg Player Price
            </Text>
            <Text
              style={{
                color: theme.colors.text.black,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.medium,
              }}
            >
              {set.tcgPlayerPrice?.toFixed(2)}€
            </Text>
          </View>
          {set.tcgPlayerTrendingPrice === 'up' ? (
            <TrendingUp size={24} color={theme.colors.success} />
          ) : (
            <TrendingDown size={24} color={theme.colors.danger} />
          )}
        </View>
      </View>
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
  setDetailsContainer: {
    gap: 8,
  },
  setDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  setDetailsInfo: {
    gap: 4,
  },
});
