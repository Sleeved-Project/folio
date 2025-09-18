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
import { useCancelPaymentSheet } from '../../payment/hooks/mutations/useCancelPaymentSheet';
import { AdStatusEnum } from '../types';
import CertificationBadge from '../components/CertificationBadge';

export default function AdDetailScreen({ adId }: { adId: string }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const theme = useTheme();
  const { data: ad, isLoading, error } = useAdDetail(adId);

  const { mutateAsync: fetchPaymentSheetParams } = useFetchPaymentSheet(adId);
  const { mutateAsync: cancelPaymentSheet } = useCancelPaymentSheet(adId);
  const [loading, setLoading] = useState(false);
  const [paymentSheetReady, setPaymentSheetReady] = useState(false);

  const handleSeeCardDetail = (cardId: string) => router.push(`/card/${cardId}`);
  const handleSeller = (sellerId: string) => router.push(`/seller/${sellerId}`);

  if (isLoading) return <LoadingState />;
  if (error || !ad) return <ErrorState message="Failed to load ad details." />;

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
      if (error) throw error;
      setPaymentSheetReady(true);
    } catch (err: unknown) {
      throw new Error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    try {
      if (!paymentSheetReady) await initializePaymentSheet();
      const { error } = await presentPaymentSheet();
      if (error) {
        if (error.code === 'Canceled') {
          setPaymentSheetReady(false);
          await cancelPaymentSheet();
          return;
        }
        throw new Error(error.message || 'Stripe Payment Sheet must be initialized before presenting');
      }
      setLoading(false);
      router.push('/order-confirmation');
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : 'An unknown error occurred while processing payment';
      Alert.alert('Payment Error', message);
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <AdHeader imageRecto={ad.rectoImageUrl} imageVerso={ad.versoImageUrl} title={ad.card.name} />
        <AdSellerCard seller={ad.seller} onPress={handleSeller} />
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, { color: theme.colors.text.black }]}
          >
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

        {ad.certificate && <CertificationBadge certification={ad.certificate} />}
      </ScrollView>

      <AdActionBar
        ad={ad}
        onSeeCardDetail={handleSeeCardDetail}
        onBuy={openPaymentSheet}
        isLoading={loading}
        canBuy={ad.status.label === AdStatusEnum.PUBLISHED}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 100 },
  section: { marginHorizontal: 16, gap: 4, marginTop: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '600' },
});
