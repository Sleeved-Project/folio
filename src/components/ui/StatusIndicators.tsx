import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AccessibilityInfo } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { CircleAlertIcon } from 'lucide-react-native';

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
      style={[
        styles.centerContainer,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
          borderColor: theme.colors.danger,
          borderWidth: 1,
        },
      ]}
      accessible
      accessibilityRole="alert"
      accessibilityLabel={message}
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
