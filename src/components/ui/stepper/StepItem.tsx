import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface StepItemProps {
  step: string;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
}

export default function StepItem({ step, index, isActive, isCompleted }: StepItemProps) {
  const theme = useTheme();

  return (
    <View style={styles.stepContainer}>
      <View
        style={[
          styles.stepNumber,
          {
            backgroundColor: theme.colors.background.tertiary,
            borderColor: theme.colors.border.light,
          },
          isActive && {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          },
          isCompleted && {
            backgroundColor: theme.colors.success,
            borderColor: theme.colors.success,
          },
        ]}
      >
        <Text
          style={[
            {
              fontSize: theme.typography.fontSizes.sm,
              fontWeight: theme.typography.fontWeights.semiBold,
              color: theme.colors.text.secondary,
            },
            isActive && { color: theme.colors.text.onPrimary },
            isCompleted && { color: theme.colors.text.onPrimary },
          ]}
        >
          {index + 1}
        </Text>
      </View>

      <Text
        style={[
          {
            fontSize: theme.typography.fontSizes.xs,
            color: theme.colors.text.secondary,
            textAlign: 'center',
            fontWeight: theme.typography.fontWeights.regular,
          },
          isActive && {
            color: theme.colors.primary,
            fontWeight: theme.typography.fontWeights.semiBold,
          },
          isCompleted && {
            color: theme.colors.success,
            fontWeight: theme.typography.fontWeights.medium,
          },
        ]}
      >
        {step}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
