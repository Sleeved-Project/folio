import { User } from 'lucide-react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import StarRating from '../../user/components/profile/StarRating';
import { Seller } from '../types';

interface AdSellerCardProps {
  seller: Seller;
  onPress?: (id: string) => void;
}

export default function AdSellerCard({ seller, onPress }: AdSellerCardProps) {
  const theme = useTheme();

  return (
    <Pressable onPress={() => onPress?.(seller.id)} style={styles.container}>
      {seller.avatarUrl ? (
        <Image source={{ uri: seller.avatarUrl }} style={styles.avatar} />
      ) : (
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: theme.colors.background.secondary,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <User size={20} color={theme.colors.text.secondary} />
        </View>
      )}
      <View style={styles.info}>
        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          {seller.username}
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
    width: 40,
    height: 40,
    borderRadius: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
});
