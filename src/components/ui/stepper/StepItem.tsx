import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface StepItemProps {
  step: string;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function StepItem({
  step,
  index,
  isActive,
  isCompleted,
  onPress,
  disabled,
  style,
}: StepItemProps) {
  const theme = useTheme();

  const accessibilityLabel = `${index + 1}. ${step}`;
  const accessibilityState = {
    selected: isActive,
    disabled: disabled,
    checked: isCompleted,
  };
  const accessibilityHint = isActive
    ? 'Current step'
    : isCompleted
    ? 'Step completed'
    : 'Tap to go to this step';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      accessibilityHint={accessibilityHint}
    >
      <View style={[styles.stepContainer, style]}>
        <View
          style={[
            styles.stepNumber,
            { backgroundColor: theme.colors.background.tertiary },
            isActive && { backgroundColor: theme.colors.variants.primaryLight },
            isCompleted && { backgroundColor: theme.colors.success },
          ]}
        >
          <Text
            style={[
              {
                fontSize: theme.typography.fontSizes.sm,
                fontWeight: theme.typography.fontWeights.semiBold,
                color: theme.colors.text.secondary,
              },
              isActive && { color: theme.colors.primaryForeground },
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
              color: theme.colors.primaryForeground,
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
    </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
