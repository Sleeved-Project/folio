import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface BadgeProps {
  value: number;
}

export default function Badge({ value }: BadgeProps) {
  const theme = useTheme();

  if (!value) return null;
  return (
    <View style={[styles.badge, { backgroundColor: theme.colors.background.secondary }]}>
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.sm,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    zIndex: 2,
    borderRadius: 12,
  },
  text: {
    fontWeight: 'bold',
  },
});
