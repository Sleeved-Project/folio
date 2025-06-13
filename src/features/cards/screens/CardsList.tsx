import { StyleSheet, View } from 'react-native';
import { useCards } from '../hooks/queries/useCardsQuery';
import { useState } from 'react';
import SearchBar from '../../../components/SearchBar';
import CardListDisplay from '../../../components/CardListDisplay';

export default function CardsList() {
  const [cardName, setCardName] = useState<string>('');
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCards(cardName);

  const cards = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View style={styles.container}>
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
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    gap: 16,
  },
  text: {
    color: 'black',
  },
});
