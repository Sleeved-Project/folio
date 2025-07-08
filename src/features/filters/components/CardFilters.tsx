import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ChevronDown } from 'lucide-react-native';
import { Filters } from '../types';
import { ScrollView } from 'react-native-gesture-handler';

interface CardFiltersProps {
  filtersOptions: {
    label: string;
    values: { id: string; label: string }[];
  }[];
  filters?: Filters;
  setIsFilterDetailVisible: (isVisible: boolean) => void;
  setSelectedFilterIndex: (index: number | null) => void;
}

export default function CardFilters({
  filtersOptions,
  filters,
  setSelectedFilterIndex,
  setIsFilterDetailVisible,
}: CardFiltersProps) {
  const theme = useTheme();

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filtersOptions.length > 0 &&
          filtersOptions.map((filter, index) => {
            const filterValuesLength =
              filters?.find((f) => f.label === filter.label)?.values?.length || 0;
            return (
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
                {filterValuesLength > 0 && (
                  <>
                    <View
                      style={[
                        styles.filterNumber,
                        {
                          backgroundColor: theme.colors.secondary,
                          borderRadius: theme.borderRadius.round,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            color: theme.colors.background.primary,
                            fontSize: theme.typography.fontSizes.lg,
                            fontWeight: theme.typography.fontWeights.bold,
                          },
                        ]}
                      >
                        {filterValuesLength}
                      </Text>
                    </View>
                    <View style={styles.filterLabel} />
                  </>
                )}
                <Text
                  style={[
                    {
                      color: theme.colors.text.tertiary,
                      fontSize: theme.typography.fontSizes.md,
                    },
                  ]}
                >
                  {filter.label}
                </Text>
                <ChevronDown color={theme.colors.text.tertiary} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  filterNumber: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
  },
  filterLabel: {
    borderLeftWidth: 1,
    borderColor: '#D0D0D0',
    paddingLeft: 8,
    height: 25,
  },
});
