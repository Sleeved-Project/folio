import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import EmptyStateCards from '../components/EmptyStateCards';

export default function MyCardsScreen() {
  const theme = useTheme();

  const hasCards = false;

  // Simulate no cards for demonstration purposes
  // In a real application, this would be replaced with actual data fetching logic
  if (!hasCards) {
    return <EmptyStateCards />;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>My Cards</Text>
      <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
        This section will display your card collection
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
