import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import { Order } from '../../../marketplace/types';
import OrderItem from '../../../marketplace/components/OrderItem';

interface UserOrderListProps {
  userId: string;
}

export default function UserOrderList({ userId }: UserOrderListProps) {
  console.log('userId', userId);

  const theme = useTheme();
  // const { data: orders, isLoading, error } = useUserOrders(userId);
  // const ordersListFlat = orders?.pages.flatMap((page) => page.data) ?? ([] as Order[]);

  // if (isLoading) return <LoadingState />;
  // if (error) return <ErrorState message={error.message} />;

  const orders: Order[] = [
    {
      id: 'order1',
      card: { rectoImageUrl: 'https://images.pokemontcg.io/base1/1_hires.png', name: 'Card 1' },
      sellerUsername: 'seller1',
      originalPrice: '100',
      condition: { id: '1', label: 'Near Mint' },
      finish: { id: '1', label: 'Glossy' },
      status: { id: '1', label: 'Pending' },
      createdAt: 'Sep 18, 2025',
    },
  ];
  const ordersListFlat = orders;

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
