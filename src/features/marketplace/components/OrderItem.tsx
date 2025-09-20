import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Order } from '../types';
import { ChevronRight } from 'lucide-react-native';
import OrderCardItem from './OrderCardItem';

interface OrderItemProps {
  item: Order;
}

export default function OrderItem({ item }: OrderItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      key={item.id}
      onPress={() => router.push(`/order/${item.id}`)}
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.medium,
      }}
    >
      <View style={[styles.container, { padding: theme.spacing.sm }]}>
        <OrderCardItem
          rectoImageUrl={item.card.rectoImageUrl}
          originalPrice={item.originalPrice}
          condition={item.condition}
          finish={item.finish}
          card={item.card}
          seller={item.seller}
          status={item.status}
          createdAt={item.createdAt}
        />
        <ChevronRight size={24} color={theme.colors.text.primary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 4,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 12,
    marginTop: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
