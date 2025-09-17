import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
import { PenLine } from 'lucide-react-native';
import PriceCheckout from '../components/PriceCheckout';
import { Checkout } from '../types';
import { useCancelPaymentSheet } from '../../payment/hooks/mutations/useCancelPaymentSheet';

const Link = ({ label, onPress }: { label?: string; onPress?: () => void }) => {
  const theme = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.linkContainer} onPress={handlePress}>
      <PenLine size={22} color={theme.colors.text.primary} />
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.sm,
              fontWeight: theme.typography.fontWeights.bold,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default function PurchaseRecapScreen({ adId }: { adId: string }) {
  const insets = useSafeAreaInsets();
  // const { data: checkout, isLoading, error } = useCheckout(adId);
  // if (isLoading) return <LoadingState />;
  // if (error || !checkout) return <ErrorState message="Failed to load checkout." />;

  const checkout: Checkout = {
    id: 'checkout_123',
    ad: {
      id: 'ad_123',
      card: {
        name: 'Black Lotus',
      },
      rectoImageUrl: 'https://images.pokemontcg.io/base1/1.png',
      seller: {
        id: 'seller_123',
        avatarUrl: 'https://example.com/john-doe.jpg',
        username: 'JohnDoe',
      },
      originalPrice: '20.00',
      condition: {
        id: 'cond_123',
        label: 'Mint',
      },
      deliveryAddress: {
        id: 'address_123',
      },
      finish: { id: 'finish_123', label: 'Holo' },
      status: { id: 'status_123', label: 'Available' },
      certificate: {
        centeringRating: '3.80',
        certifiedAt: '2025-09-16T09:52:50.000+00:00',
        cornerRating: '3.60',
        edgeRating: '4.20',
        globalRating: '4.00',
        id: '099a04c7-fece-45e4-ab8b-860c24e4b26e',
        surfaceRating: '4.40',
      },
    },
    prices: {
      totalCost: '28.90',
      shippingCost: '3.90',
      serviceCost: '5',
    },
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { mutateAsync: fetchPaymentSheetParams } = useFetchPaymentSheet(adId);
  const { mutateAsync: cancelPaymentSheet } = useCancelPaymentSheet(adId);

  const [paymentSheetReady, setPaymentSheetReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModifying, setIsModifying] = useState(false);

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
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <Accordion title={'Seller'} initiallyOpen shouldTakeFullWidth>
        <PurchaseRecapSellerCard seller={checkout.ad.seller} />
      </Accordion>
      <Accordion title={'Your cart'} initiallyOpen shouldTakeFullWidth>
        <OrderCartRecap ad={checkout.ad} />
      </Accordion>
      <Accordion
        title={'Delivery Address'}
        initiallyOpen
        shouldTakeFullWidth
        rightElement={
          <Link
            label="Edit"
            onPress={() => {
              console.log('Modify address pressed');
              setIsModifying(!isModifying);
            }}
          />
        }
      >
        <BuyerDeliveryAddress
          isModifying={isModifying}
          buyerAddressId={checkout.ad.deliveryAddress.id}
        />
      </Accordion>
      <Accordion title={'Total'} initiallyOpen shouldTakeFullWidth>
        <PriceCheckout price={checkout.prices} />
      </Accordion>
      <Button
        title="Purchase Now"
        onPress={openPaymentSheet}
        buttonStyle={styles.button}
        disabled={loading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
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
