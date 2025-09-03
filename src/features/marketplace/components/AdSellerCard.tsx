import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Seller } from '../types';
import StarRating from '../../user/components/profile/StarRating';
import CountryFlagDisplay from '../../../components/ui/CountryFlagDisplay';

interface AdSellerCardProps {
  seller: Seller;
  onPress?: (id: string) => void;
}

export default function AdSellerCard({ seller, onPress }: AdSellerCardProps) {
  const theme = useTheme();
  const flag = <CountryFlagDisplay countryCode={seller.flag} size={12} />;

  return (
    <Pressable onPress={() => onPress?.(seller.id)} style={styles.container}>
      <Image source={{ uri: seller.avatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.alias, { color: theme.colors.text.primary }]}>
          {seller.alias} {flag} ({seller.flag})
        </Text>
        {seller.rating && seller.ratingCount && (
          <StarRating rating={seller.rating} count={seller.ratingCount} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#BEBEBE',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  alias: {
    fontSize: 16,
    fontWeight: '600',
  },
  rating: {
    fontSize: 14,
  },
});
