import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import BadgeNumber from '../../../components/ui/BadgeNumber';
import { useTheme } from '../../../theme/useTheme';
import { Card } from '../types';

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
            }}
          />
          {item.occurrence && item.occurrence > 0 && (
            <View
              style={[
                styles.occurenceBadge,
                {
                  top: 8,
                  right: 8,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 64,
                  borderColor: theme.colors.variants.primaryLight,
                  borderWidth: 2,
                },
              ]}
            >
              <BadgeNumber value={item.occurrence} />
            </View>
          )}
          {item.isOwned && (
            <View
              style={[
                styles.occurenceBadge,
                {
                  top: '50%',
                  left: '50%',
                  transform: [{ translateX: -16 }],
                  backgroundColor: theme.colors.primary,
                  padding: theme.spacing.xs,
                  borderRadius: 64,
                  borderColor: theme.colors.variants.primaryLight,
                  borderWidth: 2,
                },
              ]}
            >
              <Check size={20} color={theme.colors.primaryForeground} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={cards}
      keyExtractor={(card, index) => `${card.id}-${index}`}
      renderItem={displayCardsList}
      numColumns={NUM_COLUMNS}
      columnWrapperStyle={{ marginBottom: GAP * 2, justifyContent: 'space-between' }}
      ListHeaderComponent={
        <View style={{ marginTop: theme.spacing.xl }}>{ListHeaderComponent}</View>
      }
      contentContainerStyle={{
        paddingBottom: theme.spacing.lg,
      }}
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
              <Text style={[styles.text, { color: theme.colors.text.secondary }]}>Loading...</Text>
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
    />
  );
}

const styles = StyleSheet.create({
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
  },
});
