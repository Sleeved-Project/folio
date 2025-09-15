import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { useTheme } from '../../../theme/useTheme';
import AdActionBar from '../components/AdActionBar';
import AdHeader from '../components/AdHeader';
import AdSellerCard from '../components/AdSellerCard';
import { useAdDetail } from '../hooks/queries/useAdDetail';
import { useFetchPaymentSheet } from '../../payment/hooks/mutations/useFetchPaymentSheet';

export default function AdDetailScreen({ adId }: { adId: string }) {
  const theme = useTheme();
  const { data: ad, isLoading, error } = useAdDetail(adId);
  if (isLoading) return <LoadingState />;
  if (error || !ad) return <ErrorState message="Failed to load ad details." />;

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { mutateAsync: fetchPaymentSheetParams } = useFetchPaymentSheet(ad.id);
  const [loading, setLoading] = useState(false);
  const [paymentSheetReady, setPaymentSheetReady] = useState(false);
  const [canBuy, setCanBuy] = useState(true);

  const handleSeeCardDetail = (id: string) => {
    console.log('See card detail for ad id:', id);
  };

  const handleSeller = (sellerId: string) => {
    router.push(`/profile/${sellerId}`);
  };

  const initializePaymentSheet = async () => {
    try {
      setLoading(true);
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Sleeved',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: `folio://ad/${ad.id}`,
      });

      if (!error) {
        setPaymentSheetReady(true);
      }
    } catch (error) {
      console.error('Error initializing payment sheet', error);
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    if (!paymentSheetReady) {
      await initializePaymentSheet();
    }

    const { error } = await presentPaymentSheet();
    console.log('Present payment sheet', { error });

    if (error) {
      setLoading(false);
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setLoading(false);
      setCanBuy(false);
      router.push('/order-confirmation');
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <AdHeader
          imageRecto={ad.rectoImageUrl}
          imageVerso={ad.versoImageUrl}
          title={ad.card.name}
        />

        <AdSellerCard seller={ad.seller} onPress={handleSeller} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.black }]}>
            {ad.card.name}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSizes.md,
              fontWeight: theme.typography.fontWeights.medium,
              color: theme.colors.text.secondary,
            }}
          >
            {ad.originalPrice} · {ad.condition.label}
          </Text>
        </View>

        {/* {ad.certificate &&
          ad.certificate?.map((cert, index) => (
            <CertificationBadge key={index} certification={cert} />
          ))} */}

        {/* <View style={styles.section}>
          <CardAvailableOffers cardId={ad.id} title="Other selling" />
        </View> */}
      </ScrollView>

      <AdActionBar
        ad={ad}
        onSeeCardDetail={handleSeeCardDetail}
        onBuy={openPaymentSheet}
        isLoading={loading}
        canBuy={canBuy}
      />
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
