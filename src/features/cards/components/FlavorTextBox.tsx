import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface FlavorTextBoxProps {
  text?: string;
  containerStyle?: ViewStyle;
}

export default function FlavorTextBox({ text, containerStyle }: FlavorTextBoxProps) {
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
        containerStyle,
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
  },
  text: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
});
