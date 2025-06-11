import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ErrorStateProps {
  message: string;
}

export function LoadingState() {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#0970e6" />
    </View>
  );
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e63946',
    textAlign: 'center',
  },
});
