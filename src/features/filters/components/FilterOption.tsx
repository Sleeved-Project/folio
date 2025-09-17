import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Check } from 'lucide-react-native';

interface FilterOptionProps {
  option: { id: number; value: string };
  updateFiltersCallback: (value: number) => void;
  isChecked?: boolean;
}

export default function FilterOption({
  option,
  updateFiltersCallback,
  isChecked = false,
}: FilterOptionProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected: !!isChecked }}
      onPress={() => updateFiltersCallback(option.id)}
      style={[
        styles.container,
        {
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          borderRadius: theme.borderRadius.large,
          backgroundColor: theme.colors.background.tertiary,
          borderColor: isChecked ? theme.colors.primary : theme.colors.border.medium,
          shadowColor: isChecked ? theme.shadows.small.shadowColor : undefined,
          shadowOffset: isChecked ? theme.shadows.small.shadowOffset : undefined,
          shadowOpacity: isChecked ? theme.shadows.small.shadowOpacity : 0,
          shadowRadius: isChecked ? theme.shadows.small.shadowRadius : 0,
          elevation: isChecked ? theme.shadows.small.elevation : 0,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: isChecked ? theme.colors.primaryForeground : theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.medium,
          },
        ]}
      >
        {option.value}
      </Text>

      <View
        style={[
          styles.checkBoxContainer,
          {
            borderColor: isChecked ? 'transparent' : theme.colors.border.medium,
            backgroundColor: isChecked ? theme.colors.primary : theme.colors.background.primary,
            width: 28,
            height: 28,
            borderRadius: theme.borderRadius.small,
          },
        ]}
      >
        {isChecked ? <Check color={theme.colors.primaryForeground} width={16} height={16} /> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    marginRight: 12,
  },
  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});
