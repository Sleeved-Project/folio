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
  isChecked,
}: FilterOptionProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={() => updateFiltersCallback(option.id)}
      style={[
        styles.container,
        {
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background.tertiary,
          borderRadius: theme.borderRadius.large,
          marginBottom: theme.spacing.sm,
        },
      ]}
      accessible
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
      accessibilityLabel={`Filter option: ${option.value}`}
      accessibilityHint={`Tap to ${isChecked ? 'deselect' : 'select'} this filter`}
    >
      <Text
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSizes.md,
          marginBottom: theme.spacing.sm,
        }}
      >
        {option.value}
      </Text>
      <View
        style={[
          styles.checkBoxContainer,
          {
            borderColor: theme.colors.border.black,
            borderRadius: theme.borderRadius.small,
            backgroundColor: isChecked ? theme.colors.text.black : theme.colors.background.primary,
          },
        ]}
      >
        {isChecked && <Check color={theme.colors.background.primary} width={18} height={18} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: 24,
    height: 24,
  },
});
