import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Check } from 'lucide-react-native';

interface FilterOptionProps {
  value: string;
  updateFiltersCallback: (value: string) => void;
}

export default function FilterOption({ value, updateFiltersCallback }: FilterOptionProps) {
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
        key={value}
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.typography.fontSizes.md,
          marginBottom: theme.spacing.sm,
        }}
      >
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => {
          updateFiltersCallback(value);
        }}
        style={[
          styles.checkBoxContainer,
          {
            padding: theme.spacing.md,
            borderColor: theme.colors.border.black,
            borderRadius: theme.borderRadius.small,
          },
        ]}
      >
        <Check color={theme.colors.text.tertiary} width={16} height={16} />
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
    width: 16,
    height: 16,
  },
});
