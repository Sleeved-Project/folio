import { ScrollView, StyleSheet, View } from 'react-native';
// import OrderItem from '../components/OrderItem';
// import { useOrderDetail } from '../hooks/queries/useOrderDetail';
// import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { OrderDetail } from '../types';
import OrderCardItem from '../components/OrderCardItem';
import { useTheme } from '../../../theme/useTheme';
import OrderInformationItem from '../components/OrderInformationItem';
import Accordion from '../../../components/ui/Accordion';
import PurchaseRecapSellerCard from '../components/PurchaseRecapSellerCard';
import OrderStatusItem from '../components/OrderStatusItem';

export default function OrderDetailScreen({ orderId }: { orderId: string }) {
  const theme = useTheme();
  // const { data: order, isLoading, error } = useOrderDetail(orderId);

  // if (isLoading) return <LoadingState />;
  // if (error) return <ErrorState message={error.message} />;
  // if (!order) return <ErrorState message="Order not found." />;
  const order: OrderDetail = {
    id: orderId,
    card: {
      name: 'Black Lotus',
      rectoImageUrl: 'https://images.pokemontcg.io/base2/36.png',
    },
    seller: {
      id: 'seller1',
      username: 'CardSeller',
    },
    condition: { label: 'Near Mint', id: 'near_mint' },
    finish: { label: 'Holo', id: 'holo' },
    originalPrice: '10',
    totalPrice: '15',
    status: { label: 'completed', id: 'completed' },
    deliveryAddress: {
      road: '123 Main St',
      city: 'Anytown',
      zipcode: '12345',
      country: 'USA',
      countrycode: 'US',
    },
    createdAt: 'Jan 1, 2023',
    updatedAt: 'Jan 2, 2023',
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            padding: theme.spacing.md,
          },
        ]}
      >
        <View style={{ gap: theme.spacing.sm }}>
          <Accordion title={'Product'} initiallyOpen shouldTakeFullWidth>
            <OrderCardItem item={order} />
          </Accordion>
          <Accordion title={'Status'} initiallyOpen shouldTakeFullWidth>
            <OrderStatusItem item={order} />
          </Accordion>
          <Accordion title={'Order information'} initiallyOpen shouldTakeFullWidth>
            <OrderInformationItem item={order} />
          </Accordion>
          <Accordion title={'Seller'} initiallyOpen shouldTakeFullWidth>
            <PurchaseRecapSellerCard seller={order.seller} />
          </Accordion>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  sectionContainer: {
    flexDirection: 'row',
  },
});
