import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface StepSeparatorProps {
  isCompleted: boolean;
  width?: number;
  marginHorizontal?: number;
}

export default function StepSeparator({
  isCompleted,
  width = 64,
  marginHorizontal = 32,
}: StepSeparatorProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.separator,
        {
          width,
          marginHorizontal,
          borderTopColor: theme.colors.border.light,
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
    height: 2,
    marginBottom: 20,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
  },
});
