import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { Card } from '../types';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import Badge from '../../../components/ui/Badge';

interface CardListDisplayProps {
  cards: Card[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  error?: Error | null;
  listOrigin?: 'scan' | 'collection';
  ListHeaderComponent?: React.ReactElement | null;
}

export default function CardListDisplay({
  cards,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  fetchNextPage,
  error,
  listOrigin,
  ListHeaderComponent = null,
}: CardListDisplayProps) {
  const router = useRouter();
  const theme = useTheme();
  const width = useWindowDimensions().width - 32;

  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
  const CARD_HEIGHT = CARD_WIDTH * 1.36;

  const displayCardsList = ({ item }: { item: Card }) => (
    <View style={{ width: CARD_WIDTH, marginHorizontal: GAP / 2 }}>
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
        <View style={styles.occurenceContainer}>
          <Image
            source={{ uri: item.imageSmall }}
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: theme.borderRadius.medium,
              ...theme.shadows.small,
            }}
          />
          {item.occurrence && item.occurrence > 0 && (
            <View style={styles.occurenceBadge}>
              <Badge value={item.occurrence} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <FlatList
        data={cards}
        keyExtractor={(card, index) => `${card.id}-${index}`}
        renderItem={displayCardsList}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={{ marginBottom: GAP * 2, justifyContent: 'space-between' }}
        ListHeaderComponent={ListHeaderComponent}
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
            <Text
              style={[
                styles.text,
                { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md },
              ]}
            >
              No cards available
            </Text>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  listContent: {
    paddingBottom: 32,
  },
  text: {
    textAlign: 'center',
    padding: 16,
  },
  errorText: {
    fontWeight: '500',
  },
  loaderContainer: {
    padding: 16,
    alignItems: 'center',
  },
  occurenceContainer: {
    position: 'relative',
  },
  occurenceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
