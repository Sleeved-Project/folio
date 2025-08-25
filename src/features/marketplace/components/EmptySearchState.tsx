import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface EmptySearchStateProps {
  query: string;
  isLoading: boolean;
  error: string | null;
  emptyMessage: string;
}

export function EmptySearchState({ query, isLoading, error, emptyMessage }: EmptySearchStateProps) {
  const theme = useTheme();

  if (isLoading) {
    return null; // handled by parent with ActivityIndicator
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: theme.colors.text.secondary }]}>
        {error ? String(error) : query.trim() ? emptyMessage : emptyMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
