import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface FlavorTextBoxProps {
  text?: string;
}

export default function FlavorTextBox({ text }: FlavorTextBoxProps) {
  const theme = useTheme();

  if (!text) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSizes.md - 1,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  text: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
