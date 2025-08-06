import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface StepSeparatorProps {
  isCompleted: boolean;
}

export default function StepSeparator({ isCompleted }: StepSeparatorProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.separator,
        {
          borderTopWidth: 2,
          borderTopColor: theme.colors.border.light,
          borderStyle: 'dashed',
          backgroundColor: 'transparent',
        },
        isCompleted && {
          borderTopColor: theme.colors.success,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 64,
    height: 2,
    marginHorizontal: 32,
    marginBottom: 20,
  },
});
