import { View, Text, Image, StyleSheet } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';
import { Offer } from '../types';

interface OtherOffersListProps {
  offers: Offer[];
}

export default function OtherOffersList({ offers }: OtherOffersListProps) {
  const theme = useTheme();

  if (offers.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TitleSection title="Other offers" />
      {offers.map((offer) => (
        <View key={offer.id} style={[styles.offer, { borderColor: theme.colors.border.dark }]}>
          <Image source={{ uri: offer.thumbnail }} style={styles.thumbnail} />
          <View style={styles.info}>
            <Text style={[styles.seller, { color: theme.colors.text.primary }]}>
              {offer.seller.alias}
            </Text>
            <Text style={[styles.condition, { color: theme.colors.text.secondary }]}>
              {offer.condition}
            </Text>
            <Text style={[styles.price, { color: theme.colors.text.primary }]}>
              {offer.price.amount} {offer.price.currency}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  offer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  seller: {
    fontWeight: '600',
    fontSize: 15,
  },
  condition: {
    fontSize: 13,
  },
  price: {
    marginTop: 2,
    fontWeight: '500',
  },
});
