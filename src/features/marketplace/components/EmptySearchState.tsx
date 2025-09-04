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
}

export function EmptySearchState({
  query,
  isLoading,
  error,
  icon,
  title,
  message,
}: EmptySearchStateProps) {
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={styles.container}>
        {icon}
        <Text
          style={[
            styles.text,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.bold,
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.text,
            { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md },
          ]}
        >
          {error ? String(error) : query.trim() ? message : message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {icon}
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
        >
          {title}
        </Text>
        <Text
          style={[
            styles.text,
            { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md },
          ]}
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
