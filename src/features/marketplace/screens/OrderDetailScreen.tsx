import { ScrollView, StyleSheet } from 'react-native';
import OrderItem from '../components/OrderItem';
import { useOrderDetail } from '../hooks/queries/useOrderDetail';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';

export default function OrderDetailScreen({ orderId }: { orderId: string }) {
  const { data: order, isLoading, error } = useOrderDetail(orderId);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!order) return <ErrorState message="Order not found." />;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <OrderItem item={order} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  section: {
    marginHorizontal: 16,
    gap: 4,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});
