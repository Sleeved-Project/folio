import { Text, StyleSheet, View, FlatList, Image } from 'react-native';
import { useCards } from '../hooks/queries/useCardsQuery';
import { useState } from 'react';
import SearchBar from '../../../components/SearchBar';
import { Link } from 'expo-router';
import { Card } from '../types';

export default function CardsList() {
  const [cardName, setCardName] = useState<string>('');
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCards(cardName);

  const cards = data?.pages.flatMap((page) => page.data) ?? [];

  const displayCardsList = ({ item }: { item: Card }) => {
    return (
      <View key={item.id} style={{ margin: 8 }}>
        <Link href={`/card/${item.id}`}>
          <Image
            source={{ uri: item.imageSmall }}
            style={{ width: 167, height: 227, borderRadius: 8 }}
          />
        </Link>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={cardName}
        setSearchQuery={(newName: string) => setCardName(newName)}
      />
      <FlatList
        data={cards}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={displayCardsList}
        numColumns={2}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (isFetchingNextPage || isLoading) {
            return <Text style={styles.text}>Loading...</Text>;
          }
          if (error) {
            return <Text style={styles.text}>Error loading cards</Text>;
          }
          return null;
        }}
        ListEmptyComponent={() => <Text style={styles.text}>No cards available</Text>}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  text: {
    color: 'black',
  },
});
