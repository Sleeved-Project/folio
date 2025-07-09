import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Check } from 'lucide-react-native';
import { getDisplayName } from '../utils/filter.utils';

interface FilterOptionProps {
  value: { id: number; label: string } | { id: number; name: string };
  updateFiltersCallback: (value: number) => void;
  isChecked?: boolean;
}

export default function FilterOption({
  value,
  updateFiltersCallback,
  isChecked,
}: FilterOptionProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background.tertiary,
          borderRadius: theme.borderRadius.large,
          marginBottom: theme.spacing.sm,
        },
      ]}
    >
      <Text
        key={getDisplayName(value)}
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSizes.md,
          marginBottom: theme.spacing.sm,
        }}
      >
        {getDisplayName(value)}
      </Text>
      <TouchableOpacity
        onPress={() => {
          updateFiltersCallback(value.id);
        }}
        style={[
          styles.checkBoxContainer,
          {
            borderColor: theme.colors.border.black,
            borderRadius: theme.borderRadius.small,
            backgroundColor: isChecked ? theme.colors.text.black : theme.colors.background.primary,
          },
        ]}
      >
        {isChecked ? (
          <Check color={theme.colors.background.primary} width={18} height={18} />
        ) : null}
      </TouchableOpacity>
    </View>
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
