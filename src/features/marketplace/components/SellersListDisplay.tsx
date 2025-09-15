import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { Seller } from '../types';
import { SellerRowItem } from './SellerRowItem';
import { theme } from '../../../theme/theme';
import { router } from 'expo-router';

interface UsersListDisplayProps {
  users: Seller[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  ListEmptyComponent: React.ReactElement | null;
  fetchNextPage?: () => void;
  error?: Error | null;
}

export default function SellersListDisplay({
  users,
  hasNextPage,
  isFetchingNextPage,
  ListEmptyComponent,
  fetchNextPage,
  isLoading,
  error,
}: UsersListDisplayProps) {
  return (
    <FlatList
      data={users}
      key="usersList"
      keyExtractor={(item) => `user-${item.id}`}
      renderItem={({ item }) => (
        <SellerRowItem
          item={item}
          onPress={() => {
            router.push(`/seller/${item.id}`);
          }}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={ListEmptyComponent}
      removeClippedSubviews
      windowSize={11}
      initialNumToRender={10}
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
              Error loading users
            </Text>
          );
        }
        return null;
      }}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage && fetchNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { paddingBottom: 20 },
  separator: { height: 1, backgroundColor: '#00000010' },
  text: { textAlign: 'center', padding: 16 },
  errorText: { fontWeight: '500' },
  loaderContainer: { padding: 16, alignItems: 'center' },
});
