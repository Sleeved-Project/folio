import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { useTheme } from '../../../theme/useTheme';
import AdActionBar from '../components/AdActionBar';
import AdHeader from '../components/AdHeader';
import AdSellerCard from '../components/AdSellerCard';
import { useAdDetail } from '../hooks/queries/useAdDetail';

export default function AdDetailScreen({ adId }: { adId: string }) {
  const theme = useTheme();
  const { data: ad, isLoading, error } = useAdDetail(adId);

  if (isLoading) return <LoadingState />;
  if (error || !ad) return <ErrorState message="Failed to load ad details." />;

  const handleSeeCardDetail = (id: string) => {
    console.log('See card detail for ad id:', id);
  };

  const handleBuy = (id: string) => {
    console.log('Buy ad id:', id);
  };

  const handleSeller = (sellerId: string) => {
    router.push(`/profile/${sellerId}`);
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
    gap: 4,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});
