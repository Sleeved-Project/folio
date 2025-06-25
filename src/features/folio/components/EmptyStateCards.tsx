import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { Button } from '../../../components/ui';
import { Package } from 'lucide-react-native';

export default function EmptyStateCards() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background.primary }]}>
      <Package size={80} color={theme.colors.text.tertiary} strokeWidth={1.5} />

      <Text
        style={[
          styles.emptyTitle,
          { color: theme.colors.text.primary, marginTop: theme.spacing.xl },
        ]}
      >
        You haven&#39;t owned cards yet
      </Text>

      <Text
        style={[
          styles.emptyDescription,
          { color: theme.colors.text.secondary, marginBottom: theme.spacing.xl },
        ]}
      >
        Explore our collection and add cards to your folio
      </Text>

      <Button
        title="See all cards"
        variant="primary"
        onPress={() => router.push('/(tabs)')}
        buttonStyle={styles.button}
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
