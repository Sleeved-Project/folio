import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface OrderCardItemProps {
  rectoImageUrl: string;
  originalPrice: string;
  condition: { label: string };
  finish: { label: string };
  card: { name: string };
  seller: { username: string };
  status: { label: string };
  createdAt: string;
}

export default function OrderCardItem({
  rectoImageUrl,
  originalPrice,
  condition,
  finish,
  card,
  seller,
  status,
  createdAt,
}: OrderCardItemProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { padding: theme.spacing.sm }]}>
      <Image source={{ uri: rectoImageUrl }} style={styles.image} resizeMode="cover" />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
          {card.name} ({finish.label}) · ${originalPrice}
        </Text>
        <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
          Sold by : <Text style={{ color: theme.colors.text.tertiary }}>@{seller.username}</Text>
        </Text>
        <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
          Condition: <Text style={{ fontWeight: '500' }}>{condition.label}</Text>
        </Text>
        <View>
          <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
            Sold on : <Text style={{ fontWeight: '500' }}>{createdAt}</Text>
          </Text>
        </View>
        <View style={[styles.status, { backgroundColor: theme.colors.background.primary }]}>
          <Text>{status.label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 4,
    marginRight: 12,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
