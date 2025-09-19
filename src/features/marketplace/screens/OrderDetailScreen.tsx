import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useOrderDetail } from '../hooks/queries/useOrderDetail';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import OrderCardItem from '../components/OrderCardItem';
import { useTheme } from '../../../theme/useTheme';
import OrderInformationItem from '../components/OrderInformationItem';
import Accordion from '../../../components/ui/Accordion';
import PurchaseRecapSellerCard from '../components/PurchaseRecapSellerCard';
import OrderStatusItem from '../components/OrderStatusItem';
import { router } from 'expo-router';

export default function OrderDetailScreen({ orderId }: { orderId: string }) {
  const theme = useTheme();
  const { data: order, isLoading, error } = useOrderDetail(orderId);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!order) return <ErrorState message="Order not found." />;

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
              card={order.ad.card}
              seller={order.ad.seller}
              status={order.status}
              createdAt={order.createdAt}
            />
          </Accordion>
          <Accordion title={'Status'} initiallyOpen shouldTakeFullWidth>
            <OrderStatusItem updatedAt={order.updatedAt} status={order.status} />
          </Accordion>
          <Accordion title={'Order information'} initiallyOpen shouldTakeFullWidth>
            <OrderInformationItem
              orderId={order.id}
              totalCosts={order.prices.totalCosts}
              createdAt={order.createdAt}
              addresses={order.addresses.delivery}
            />
          </Accordion>
          <Accordion title={'Seller'} initiallyOpen shouldTakeFullWidth>
            <TouchableOpacity
              key={order.ad.seller.id}
              onPress={() => router.push(`/seller/${order.ad.seller.id}`)}
            >
              <PurchaseRecapSellerCard seller={order.ad.seller} />
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
