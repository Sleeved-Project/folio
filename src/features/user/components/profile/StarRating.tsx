import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';
import { useTheme } from '../../../../theme/useTheme';

interface StarRatingProps {
  style?: object;
  rating: number;
  max?: number;
  count?: number;
}

export default function StarRating({ style, rating = 0, max = 5, count }: StarRatingProps) {
  const theme = useTheme();

  return (
    <View style={[styles.row, style]}>
      <View style={styles.container}>
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            size={22}
            color={i < rating ? theme.colors.yellow : theme.colors.text.tertiary}
            fill={i < rating ? theme.colors.yellow : 'none'}
          />
        ))}
      </View>
      {count && (
        <Text style={[styles.count, { color: theme.colors.text.secondary }]}>({count})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  container: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  count: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});
