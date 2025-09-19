import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { router } from 'expo-router';

export default function OrderDetailScreen({ orderId }: { orderId: string }) {
  const theme = useTheme();
  // const { data: order, isLoading, error } = useOrderDetail(orderId);

  // if (isLoading) return <LoadingState />;
  // if (error) return <ErrorState message={error.message} />;
  // if (!order) return <ErrorState message="Order not found." />;
  const order: OrderDetail = {
    id: orderId,
    ad: {
      originalPrice: '10',
      condition: { label: 'Near Mint' },
      finish: { label: 'Holo' },
      rectoImageUrl: 'https://images.pokemontcg.io/base2/31_hires.png',
    },
    seller: {
      id: 'seller1',
      username: 'CardSeller',
      profilePictureUrl: 'https://example.com/profile.jpg',
    },
    card: {
      name: 'Pikachu',
    },
    prices: { totalCosts: '15€' },
    status: { label: 'completed', id: 'completed' },
    addresses: {
      delivery: {
        id: 'addr1',
        road: '123 Main St',
        city: 'Anytown',
        zipcode: '12345',
        country: 'USA',
        countrycode: 'US',
        additionalInfo: 'Leave at front door',
      },
      billing: {
        id: 'addr2',
        road: '456 Elm St',
        city: 'Othertown',
        zipcode: '67890',
        country: 'USA',
        countrycode: 'US',
        additionalInfo: '',
      },
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
            <OrderCardItem
              rectoImageUrl={order.ad.rectoImageUrl}
              originalPrice={order.ad.originalPrice}
              condition={order.ad.condition}
              finish={order.ad.finish}
              card={order.card}
              seller={order.seller}
              status={order.status}
              createdAt={order.createdAt}
            />
          </Accordion>
          <Accordion title={'Status'} initiallyOpen shouldTakeFullWidth>
            <OrderStatusItem updatedAt={order.updatedAt} status={order.status} />
          </Accordion>
          <Accordion title={'Order information'} initiallyOpen shouldTakeFullWidth>
            <OrderInformationItem item={order} />
          </Accordion>
          <Accordion title={'Seller'} initiallyOpen shouldTakeFullWidth>
            <TouchableOpacity
              key={order.seller.id}
              onPress={() => router.push(`/profile/${order.seller.id}`)}
            >
              <PurchaseRecapSellerCard seller={order.seller} />
            </TouchableOpacity>
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
