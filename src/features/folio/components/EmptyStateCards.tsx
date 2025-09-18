import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { Button } from '../../../components/ui';
import { Package } from 'lucide-react-native';

export default function EmptyStateCards() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      style={[styles.emptyContainer, { backgroundColor: theme.colors.background.primary }]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel="No cards owned"
      accessibilityHint="You currently don't own any cards, explore and add cards to your folio"
    >
      <Package
        size={80}
        color={theme.colors.text.tertiary}
        strokeWidth={1.5}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Empty card package icon"
      />

      <Text
        style={[styles.emptyTitle, { color: theme.colors.text.primary, marginTop: theme.spacing.xl }]}
        accessible
        accessibilityRole="header"
        accessibilityLabel="You currently don't own any cards"
      >
        You currently don&#39;t own any cards
      </Text>

      <Text
        style={[styles.emptyDescription, { color: theme.colors.text.secondary, marginBottom: theme.spacing.xl }]}
        accessible
        accessibilityRole="text"
        accessibilityLabel="Explore our collection and add cards to your folio"
      >
        Explore our collection and add cards to your folio
      </Text>

      <Button
        title="See all cards"
        variant="primary"
        onPress={() => router.push('/(tabs)/explorer')}
        buttonStyle={styles.button}
        accessibilityLabel="See all cards"
        accessibilityHint="Navigate to the card explorer to browse and add cards"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    width: 200,
  },
});
