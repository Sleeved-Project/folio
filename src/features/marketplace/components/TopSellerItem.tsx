import { View } from 'react-native';
import { Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { CameraOff } from 'lucide-react-native';

interface TopSellerItemProps {
  id: number;
  name: string;
  rate: number | null;
  sales: number;
  pictureUrl?: string | null;
}

export default function TopSellerItem({ id, name, rate, sales, pictureUrl }: TopSellerItemProps) {
  const theme = useTheme();

  return (
    <View key={id} style={styles.container}>
      {pictureUrl ? (
        <View style={[styles.image, { backgroundColor: theme.colors.background.secondary }]}>
          <Image source={{ uri: pictureUrl }} style={styles.image} />
        </View>
      ) : (
        <View style={[styles.image]}>
          <CameraOff color={theme.colors.text.secondary} />
        </View>
      )}
      <Text style={[styles.name, { color: theme.colors.text.primary }]}>{name}</Text>
      <Text style={[styles.sales, { color: theme.colors.text.secondary }]}>
        {rate ?? 'N/A'} - {sales} sales
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4,
    width: 100,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 4,
  },
  sales: {
    fontWeight: '400',
    fontSize: 12,
    marginTop: 2,
  },
});
