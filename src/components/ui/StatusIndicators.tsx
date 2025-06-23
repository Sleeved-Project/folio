import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface ErrorStateProps {
  message: string;
}

export function LoadingState() {
  const theme = useTheme();

  return (
    <View style={[styles.centerContainer, { backgroundColor: theme.colors.background.secondary }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

export function ErrorState({ message }: ErrorStateProps) {
  const theme = useTheme();

  return (
    <View style={[styles.centerContainer, { backgroundColor: theme.colors.background.secondary }]}>
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
