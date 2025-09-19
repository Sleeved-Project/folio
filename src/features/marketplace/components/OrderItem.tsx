import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Order } from '../types';
import { ChevronRight } from 'lucide-react-native';

interface OrderItemProps {
  item: Order;
}

export default function OrderItem({ item }: OrderItemProps) {
  const theme = useTheme();

  return (
    <Pressable
      key={item.id}
      onPress={() => router.push(`/order/${item.id}`)}
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.medium,
      }}
    >
      <View style={[styles.container, { padding: theme.spacing.sm }]}>
        <Image source={{ uri: item.card.rectoImageUrl }} style={styles.image} resizeMode="cover" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
            {item.card.name} ({item.finish.label}) · ${item.originalPrice}
          </Text>
          <Text style={{ color: '#555', marginVertical: theme.spacing.xs }}>
            Sold by : <Text style={{ color: theme.colors.text.tertiary }}>@{item.seller.name}</Text>
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
        <View>
          <ChevronRight size={24} color={theme.colors.text.primary} />
        </View>
      </View>
    </Pressable>
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
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
