import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CardAvailableOffers from '../../cards/components/CardAvailableOffers';
import AdActionBar from '../components/AdActionBar';
import AdHeader from '../components/AdHeader';
import AdSellerCard from '../components/AdSellerCard';
import CertificationBadge from '../components/CertificationBadge';
import { useTheme } from '../../../theme/useTheme';
import certi_PSA from '../../../../assets/icons/certi/certi_PSA.png';
import certi_SLV from '../../../../assets/icons/certi/certi_SLV.png';

export default function AdDetailScreen() {
  const theme = useTheme();
  // const { data: ad, isLoading, isError } = useAdDetail();

  const handleSeeCardDetail = (id: string) => {
    console.log('See card detail for ad id:', id);
  };

  const handleBuy = (id: string) => {
    console.log('Buy ad id:', id);
  };

  // TODODELETE: Replace with hook fetch data from API
  const [ad] = useState({
    id: 'ad_123',
    title: 'Scyther holo',
    price: { amount: 29.9, currency: 'USD' },
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

      <AdActionBar ad={ad} onSeeCardDetail={handleSeeCardDetail} onBuy={handleBuy} />
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
