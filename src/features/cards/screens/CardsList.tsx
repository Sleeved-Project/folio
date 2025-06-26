import { StyleSheet, View } from 'react-native';
import { useCards } from '../hooks/queries/useCardsQuery';
import { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import CardListDisplay from '../components/CardListDisplay';
import { useTheme } from '../../../theme/useTheme';

export default function CardsList() {
  const [cardName, setCardName] = useState<string>('');
  const theme = useTheme();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCards(cardName);

  const cards = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
          paddingTop: theme.spacing.md,
          gap: theme.spacing.md,
        },
      ]}
    >
      <SearchBar
        searchQuery={cardName}
        setSearchQuery={(newName: string) => setCardName(newName)}
      />
      <CardListDisplay
        cards={cards}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        error={error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
