import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AccessibilityInfo } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface ErrorStateProps {
  message?: string;
}

export function LoadingState() {
  const theme = useTheme();

  return (
    <View
      style={[styles.centerContainer, { backgroundColor: theme.colors.background.secondary }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading content"
      accessibilityHint="Wait while the content loads"
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

export function ErrorState({ message = 'An error occurred' }: ErrorStateProps) {
  const theme = useTheme();

  React.useEffect(() => {
    AccessibilityInfo.announceForAccessibility(message);
  }, [message]);

  return (
    <View
      style={[styles.centerContainer, { backgroundColor: theme.colors.background.secondary }]}
      accessible
      accessibilityRole="alert"
      accessibilityLabel={message}
    >
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
