import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import { useTheme } from '../../../theme/useTheme';
import AdActionBar from '../components/AdActionBar';
import AdHeader from '../components/AdHeader';
import AdSellerCard from '../components/AdSellerCard';
import { useAdDetail } from '../hooks/queries/useAdDetail';
import CertificationBadge from '../components/CertificationBadge';
import { AdStatusEnum } from '../types';
import { useAuth } from '../../auth/context/AuthContext';
import TitleSection from '../../../components/ui/TitleSection';
import AdBuyerCard from '../components/AdBuyerCard';
import { Button } from '../../../components/ui';
import { WebView } from 'react-native-webview';
import { useShippingLabel } from '../hooks/mutations/useShippingLabel';

export default function AdDetailScreen({ adId }: { adId: string }) {
  const theme = useTheme();
  const { user } = useAuth();
  const { data: ad, isLoading, error } = useAdDetail(adId);
  const {
    data: shippingLabelUri,
    mutate: downloadShipingLabel,
    isPending,
  } = useShippingLabel(adId);

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

  const shouldShowBuyerInfo = ad.status.label === AdStatusEnum.SOLD && user?.id === ad.seller.id;
  const canBuy = ad.status.label === AdStatusEnum.PUBLISHED && user?.id !== ad.seller.id;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <AdHeader
          imageRecto={ad.rectoImageUrl}
          imageVerso={ad.versoImageUrl}
          title={ad.card.name}
        />

        <AdSellerCard seller={ad.seller} onPress={handleSeller} />

        <View
          style={[
            { paddingHorizontal: theme.spacing.md, marginTop: theme.spacing.md },
            styles.section,
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.primaryForeground }]}>
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

        {shouldShowBuyerInfo && (
          <View
            style={[
              { paddingHorizontal: theme.spacing.md, marginTop: theme.spacing.sm },
              styles.section,
            ]}
          >
            <TitleSection title="Buyer information" />
            <AdBuyerCard adId={ad.id} style={{ paddingBottom: theme.spacing.xl }} />
            <Button
              title="Download shipping label"
              onPress={() => downloadShipingLabel()}
              loading={isPending}
            />
          </View>
        )}

        {/* <View style={styles.section}>
          <CardAvailableOffers cardId={ad.id} title="Other selling" />
        </View> */}

        {shippingLabelUri && (
          <WebView
            source={{ uri: shippingLabelUri }}
            downloadingMessage="Shipping label downloading..."
          />
        )}
      </ScrollView>

      <AdActionBar
        ad={ad}
        onSeeCardDetail={handleSeeCardDetail}
        onBuy={handleBuy}
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
    gap: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
});
