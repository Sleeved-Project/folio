import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FlavorTextBoxProps {
  text?: string;
}

export default function FlavorTextBox({ text }: FlavorTextBoxProps) {
  if (!text) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  text: {
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
