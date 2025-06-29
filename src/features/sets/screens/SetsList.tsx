import React from 'react';
import { Text, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Set } from '../types';
import SetListDisplay from '../components/SetListDisplay';

interface SetsListProps {
  sets: Set[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  fetchNextPage?: () => void;
  error?: Error | null;
  ListHeaderComponent?: React.ReactElement | null;
}

export default function SetsList({
  sets,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  fetchNextPage,
  error,
  ListHeaderComponent = null,
}: SetsListProps) {
  const theme = useTheme();

  const GAP = 8;
  const NUM_COLUMNS = 2;

  const displaySetList = ({ item }: { item: Set }) => <SetListDisplay set={item} />;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <FlatList
        data={sets}
        keyExtractor={(card, index) => `${card.id}-${index}`}
        renderItem={displaySetList}
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
            console.log('Error loading sets:', error);

            return (
              <Text style={[styles.text, styles.errorText, { color: theme.colors.danger }]}>
                Error loading sets
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
              No sets available
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
  },
  listContent: {
    paddingTop: 16,
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
