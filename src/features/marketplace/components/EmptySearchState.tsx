import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface EmptySearchStateProps {
  query: string;
  isLoading: boolean;
  error: string | null;
  icon: React.ReactNode;
  title: string;
  message: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function EmptySearchState({
  query,
  isLoading,
  error,
  icon,
  title,
  message,
  accessibilityLabel,
  accessibilityHint,
}: EmptySearchStateProps) {
  const theme = useTheme();

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="alert"
      accessibilityLabel={accessibilityLabel ?? (error ? `Error: ${error}` : title)}
      accessibilityHint={accessibilityHint ?? (error ? 'An error occurred during search' : message)}
    >
      {icon && (
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel="Search illustration"
        >
          {icon}
        </View>
      )}
      <View style={styles.content}>
        <Text
          style={[
            styles.text,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.bold,
            },
          ]}
          accessible
          accessibilityRole="header"
          accessibilityLabel={title}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.text,
            { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md },
          ]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={error ? String(error) : message}
        >
          {error ? String(error) : query.trim() ? message : message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  content: {
    marginTop: 16,
    gap: 4,
  },
  text: {
    textAlign: 'center',
    maxWidth: 300,
  },
});
