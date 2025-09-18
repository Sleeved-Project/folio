import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { CircleAlertIcon } from 'lucide-react-native';

interface ErrorStateProps {
  message?: string;
}

export function LoadingState() {
  const theme = useTheme();

  return (
    <View style={[styles.centerContainer, { backgroundColor: theme.colors.background.secondary }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

export function ErrorState({ message = 'An error occurred' }: ErrorStateProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.centerContainer,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
          borderColor: theme.colors.danger,
          borderWidth: 1,
        },
      ]}
    >
      <CircleAlertIcon color={theme.colors.danger} style={{ marginBottom: theme.spacing.sm }} />
      <Text style={[styles.errorText, { color: theme.colors.danger }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
