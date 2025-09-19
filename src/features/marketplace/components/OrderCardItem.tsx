import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Order } from '../types';

interface OrderCardItemProps {
  item: Order;
}

export default function OrderCardItem({ item }: OrderCardItemProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { padding: theme.spacing.sm }]}>
      <Image source={{ uri: item.card.rectoImageUrl }} style={styles.image} resizeMode="cover" />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
          {item.card.name} ({item.finish.label}) · ${item.originalPrice}
        </Text>
        <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
          Sold by :{' '}
          <Text style={{ color: theme.colors.text.tertiary }}>@{item.seller.username}</Text>
        </Text>
        <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
          Condition: <Text style={{ fontWeight: '500' }}>{item.condition.label}</Text>
        </Text>
        <View>
          <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
            Sold on : <Text style={{ fontWeight: '500' }}>{item.createdAt}</Text>
          </Text>
        </View>
        <View style={[styles.status, { backgroundColor: theme.colors.background.primary }]}>
          <Text>{item.status.label}</Text>
        </View>
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
