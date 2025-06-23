import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: theme.colors.background.tertiary,
          borderColor: theme.colors.border.light,
        },
      ]}
    >
      <Text style={[styles.tagText, { color: theme.colors.text.secondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
