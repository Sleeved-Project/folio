import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import EmptyStateCards from '../components/EmptyStateCards';

export default function MyFoliosScreen() {
  const theme = useTheme();

  // Simulate no cards for demonstration purposes
  // In a real application, this would be replaced with actual data fetching logic
  const hasCards = false;

  if (!hasCards) {
    return <EmptyStateCards />;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>My Folios</Text>
      <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
        This section will display your custom folios
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
