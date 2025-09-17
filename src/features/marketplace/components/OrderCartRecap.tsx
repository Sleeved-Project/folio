import { Image, StyleSheet, Text, View } from 'react-native';
import { CheckoutAd } from '../types';
import CertificationBadge from './CertificationBadge';
import { useTheme } from '../../../theme/useTheme';

export default function OrderCartRecap({ ad }: { ad: CheckoutAd }) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {/* Card Image */}
      <Image source={{ uri: ad.rectoImageUrl }} style={styles.image} resizeMode="cover" />

      {/* Card Info */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
          {ad.card.name} · ({ad.finish.label}) · ${ad.originalPrice}
        </Text>
        <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
          Condition: <Text style={{ fontWeight: '500' }}>{ad.condition.label}</Text>
        </Text>

        {ad.certificate && (
          <CertificationBadge certification={ad.certificate} shouldMarginLeft={false} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 4,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 12,
    marginTop: 12,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
