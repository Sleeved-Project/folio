import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ChevronDown } from 'lucide-react-native';

interface CardFiltersProps {
  filters: {
    label: string;
    values: string[];
  }[];
  setIsFilterDetailVisible: (isVisible: boolean) => void;
  setSelectedFilterIndex: (index: number | null) => void;
}

export default function CardFilters({
  filters,
  setSelectedFilterIndex,
  setIsFilterDetailVisible,
}: CardFiltersProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {filters.length > 0 &&
        filters.map((filter, index) => (
          <TouchableOpacity
            key={index + filter.label}
            onPress={() => {
              setSelectedFilterIndex(index);
              setIsFilterDetailVisible(true);
            }}
            style={[
              styles.filterContainer,
              {
                padding: theme.spacing.md,
                backgroundColor: theme.colors.background.tertiary,
                borderRadius: theme.borderRadius.large,
                marginBottom: theme.spacing.sm,
              },
            ]}
          >
            <Text
              style={{ color: theme.colors.text.tertiary, fontSize: theme.typography.fontSizes.md }}
            >
              {filter.label}
            </Text>
            <ChevronDown color={theme.colors.text.tertiary} />
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
});
