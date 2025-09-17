import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { useTheme } from '../../../theme/useTheme';
import AdActionBar from '../components/AdActionBar';
import AdHeader from '../components/AdHeader';
import AdSellerCard from '../components/AdSellerCard';
import { useAdDetail } from '../hooks/queries/useAdDetail';
import CertificationBadge from '../components/CertificationBadge';

export default function AdDetailScreen({ adId }: { adId: string }) {
  const theme = useTheme();
  const { data: ad, isLoading, error } = useAdDetail(adId);

  const handleSeeCardDetail = (cardId: string) => {
    router.push(`/card/${cardId}`);
  };

  const handleSeller = (sellerId: string) => {
    router.push(`/seller/${sellerId}`);
  };

  const handleBuy = () => {
    router.push(`/purchase-recap/${adId}`);
  };

  if (isLoading) return <LoadingState />;
  if (error || !ad) return <ErrorState message="Failed to load ad details." />;

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

        {ad.certificate && <CertificationBadge certification={ad.certificate} />}

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
