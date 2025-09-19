import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Button } from '../../../components/ui';
import { router } from 'expo-router';
import { useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { useFetchPaymentSheet } from '../../payment/hooks/mutations/useFetchPaymentSheet';
import Accordion from '../../../components/ui/Accordion';
import PurchaseRecapSellerCard from '../components/PurchaseRecapSellerCard';
import OrderCartRecap from '../components/OrderCartRecap';
import BuyerDeliveryAddress from '../components/BuyerDeliveryAddress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PriceCheckout from '../components/PriceCheckout';
import { useCancelPaymentSheet } from '../../payment/hooks/mutations/useCancelPaymentSheet';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { useCheckout } from '../hooks/queries/useCheckout';
import { useDeliveryAddress } from '../hooks/queries/useDeliveryAddress';

export default function PurchaseRecapScreen({ adId }: { adId: string }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { mutateAsync: fetchPaymentSheetParams } = useFetchPaymentSheet(adId);
  const { mutateAsync: cancelPaymentSheet } = useCancelPaymentSheet(adId);
  const { data: checkout, isLoading, error } = useCheckout(adId);
  const { data: buyerAddressData } = useDeliveryAddress();
  const [paymentSheetReady, setPaymentSheetReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModifying, setIsModifying] = useState(buyerAddressData === null);

  if (isLoading) return <LoadingState />;
  if (error || !checkout) return <ErrorState message="Failed to load checkout." />;

  const initializePaymentSheet = async () => {
    try {
      setLoading(true);
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Sleeved',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: `folio://ad/${adId}`,
      });

      if (error) {
        throw error;
      }
      setPaymentSheetReady(true);
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    try {
      if (!paymentSheetReady) {
        await initializePaymentSheet();
      }

      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code === 'Canceled') {
          // Cancel payment intent + update ad status to "available" if the user cancels
          setPaymentSheetReady(false);
          await cancelPaymentSheet();
          return;
        }
        throw new Error(
          error.message || 'Stripe Payment Sheet must be initialized before presenting'
        );
      }

      setLoading(false);
      router.push('/order-confirmation');
    } catch (err: unknown) {
      setLoading(false);
      const message =
        err instanceof Error ? err.message : 'An unknown error occurred while processing payment';
      Alert.alert('Payment Error', message);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
        },
      ]}
    >
      <Accordion title={'Seller'} initiallyOpen shouldTakeFullWidth>
        <PurchaseRecapSellerCard seller={checkout.ad.seller} />
      </Accordion>
      <Accordion title={'Your cart'} initiallyOpen shouldTakeFullWidth>
        <OrderCartRecap ad={checkout.ad} />
      </Accordion>
      <Accordion title={'Delivery Address'} initiallyOpen shouldTakeFullWidth>
        <BuyerDeliveryAddress
          isModifying={isModifying}
          buyerAddressData={buyerAddressData}
          setIsModifying={() => setIsModifying(false)}
        />
      </Accordion>
      <Accordion title={'Total'} initiallyOpen shouldTakeFullWidth>
        <PriceCheckout price={checkout.prices} />
      </Accordion>
      <Button
        title="Purchase Now"
        onPress={openPaymentSheet}
        buttonStyle={styles.button}
        disabled={loading || buyerAddressData === null}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 4,
  },
});
