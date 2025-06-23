import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Card } from '../../features/cards/types';
import { useRouter } from 'expo-router';
import { useTheme } from '../../theme/useTheme';

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
  const router = useRouter();
  const theme = useTheme();

  const displayCardsList = ({ item }: { item: Card }) => {
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
            style={{
              width: 167,
              height: 227,
              borderRadius: theme.borderRadius.medium,
              ...theme.shadows.small,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
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
            return (
              <View style={styles.loaderContainer}>
                <ActivityIndicator color={theme.colors.primary} size="small" />
                <Text style={[styles.text, { color: theme.colors.text.secondary }]}>
                  Loading...
                </Text>
              </View>
            );
          }
          if (error) {
            return (
              <Text style={[styles.text, styles.errorText, { color: theme.colors.danger }]}>
                Error loading cards
              </Text>
            );
          }
          return null;
        }}
        ListEmptyComponent={() => {
          if (isFetchingNextPage || isLoading) return null;

          return (
            <Text style={[styles.text, { color: theme.colors.text.secondary }]}>
              No cards available
            </Text>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
  },
  text: {
    textAlign: 'center',
    padding: 16,
    fontSize: 16,
  },
  errorText: {
    fontWeight: '500',
  },
  loaderContainer: {
    padding: 16,
    alignItems: 'center',
  },
});
