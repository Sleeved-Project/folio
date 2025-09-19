import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import { Order } from '../../../marketplace/types';
import OrderItem from '../../../marketplace/components/OrderItem';
import { ErrorState, LoadingState } from '../../../../components/ui/StatusIndicators';
import { useUserOrders } from '../../hooks/queries/useUserInfo';
import { useRefetchOnFocus } from '../../../../hooks/useRefetchOnFocus';

export default function UserOrderList() {
  const theme = useTheme();
  const { data: orders, isLoading, error, refetch: refetchOrders } = useUserOrders();
  const ordersListFlat = orders?.pages.flatMap((page) => page.data) ?? ([] as Order[]);

  useRefetchOnFocus(refetchOrders);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (ordersListFlat.length === 0) return <ErrorState message="No orders found." />;

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.cardWrapper}>
      <OrderItem item={item} />
    </View>
  );

  return (
    <FlatList<Order>
      data={ordersListFlat}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: theme.spacing.lg,
      }}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
  },
});
