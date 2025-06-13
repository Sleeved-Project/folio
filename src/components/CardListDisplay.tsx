import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card } from '../features/cards/types';
import { useRouter } from 'expo-router';

interface CardListDisplayProps {
  cards: Card[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  error?: Error | null;
  listOrigin?: 'scan' | 'collection';
}

export default function CardListDisplay({
  cards,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  fetchNextPage,
  error,
  listOrigin,
}: CardListDisplayProps) {
  const displayCardsList = ({ item }: { item: Card }) => {
    const router = useRouter();
    return (
      <View key={item.id} style={{ margin: 8 }}>
        <TouchableOpacity
          onPress={() => {
            if (listOrigin !== 'scan') {
              router.push({ pathname: `/card/${item.id}` });
            } else {
              router.push({
                pathname: `/scan-result`,
                params: {
                  resultType: 'success',
                  cards: JSON.stringify(cards),
                  highlightedCardId: item.id,
                },
              });
            }
          }}
        >
          <Image
            source={{ uri: item.imageSmall }}
            style={{ width: 167, height: 227, borderRadius: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={cards}
        keyExtractor={(card, index) => `${card.id}-${index}`}
        renderItem={displayCardsList}
        numColumns={2}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage && fetchNextPage) {
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  text: {
    color: 'black',
  },
});
