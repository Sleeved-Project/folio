import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import CardAvailableOffers from '../../cards/components/CardAvailableOffers';
import AdActionBar from '../components/AdActionBar';
import AdHeader from '../components/AdHeader';
import AdSellerCard from '../components/AdSellerCard';
import CertificationBadge from '../components/CertificationBadge';
import { useTheme } from '../../../theme/useTheme';
import certi_PSA from '../../../../assets/icons/certi/certi_PSA.png';
import certi_SLV from '../../../../assets/icons/certi/certi_SLV.png';
import { useStripe } from '@stripe/stripe-react-native';
import { useFetchPaymentSheet } from '../../payment/hooks/mutations/useFetchPaymentSheet';
import { router } from 'expo-router';

export default function AdDetailScreen() {
  const theme = useTheme();
  // const { data: ad, isLoading, isError } = useAdDetail();
  // TODODELETE: Replace with hook fetch data from API
  const [ad] = useState({
    id: 'ad_123',
    title: 'Scyther holo',
    price: { amount: 29.9, currency: 'EUR' },
    condition: 'Bonne condition',
    imageRecto: 'https://images.pokemontcg.io/base1/1.png',
    imageVerso: 'https://i.pinimg.com/736x/b9/eb/42/b9eb42b06ef014d539d1e9f3b2871608.jpg',
    seller: {
      id: 'seller_1',
      username: 'superpoke',
      alias: 'superpoke',
      flag: 'FR',
      avatarUrl: 'https://i.pravatar.cc/100?img=1',
      rating: 4.8,
      ratingCount: 191,
    },
    certification: [
      {
        authority: {
          name: 'PSA',
          logo: certi_PSA,
        },
        grade: 9,
        label: 'Mint',
      },
      {
        authority: {
          name: 'Sleeved',
          logo: certi_SLV,
        },
        grade: 8.5,
        label: 'Near Mint',
      },
    ],
  });

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { mutateAsync: fetchPaymentSheetParams } = useFetchPaymentSheet(ad.id);
  const [loading, setLoading] = useState(false);
  const [paymentSheetReady, setPaymentSheetReady] = useState(false);
  const [canBuy, setCanBuy] = useState(true);

  const initializePaymentSheet = async () => {
    try {
      setLoading(true);
      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Sleeved',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        returnURL: 'folio://ad/ad_123',
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

  const handleSeeCardDetail = (id: string) => {
    console.log('See card detail for ad id:', id);
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
        <AdHeader imageRecto={ad.imageRecto} imageVerso={ad.imageVerso} title={ad.title} />

        <AdSellerCard seller={ad.seller} />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.black }]}>{ad.title}</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.colors.text.secondary,
            }}
          >
            {ad.price.amount} {ad.price.currency} · {ad.condition}
          </Text>
        </View>

        {ad.certification &&
          ad.certification.map((cert, index) => (
            <CertificationBadge key={index} certification={cert} />
          ))}

        <View style={styles.section}>
          <CardAvailableOffers cardId={ad.id} title="Other selling" />
        </View>
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
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});
