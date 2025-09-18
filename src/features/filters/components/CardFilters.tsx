import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ChevronDown } from 'lucide-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFilterContext } from '../../../context/FilterContext';
import { FilterTypeEnum } from '../types';

interface CardFiltersProps {
  filterType: FilterTypeEnum;
  toggleFilterDetail: (label: string) => void;
}

export default function CardFilters({ toggleFilterDetail, filterType }: CardFiltersProps) {
  const theme = useTheme();
  const { cardFilters, cardSetFilters, filtersOptions } = useFilterContext();

  const filtersMapping = {
    card: cardFilters,
    set: cardSetFilters,
  };

  const filters = filtersMapping[filterType];

  return (
    <View accessible accessibilityRole="toolbar" accessibilityLabel="Card filters toolbar">
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {Object.entries(filtersOptions).map(([label], index) => {
          const filterValuesLength = filters?.find((f) => f.label === label)?.values?.length || 0;

          return (
            <TouchableOpacity
              key={`${index}-${label}`}
              onPress={() => toggleFilterDetail(label)}
              style={[
                styles.filterContainer,
                {
                  padding: theme.spacing.sm,
                  backgroundColor: theme.colors.background.tertiary,
                  borderRadius: theme.borderRadius.large,
                },
              ]}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`Filter ${label}`}
              accessibilityHint={
                filterValuesLength > 0
                  ? `${filterValuesLength} options available, double tap to view details`
                  : 'Double tap to view filter details'
              }
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
                      style={{
                        color: theme.colors.background.primary,
                        fontSize: theme.typography.fontSizes.sm,
                        fontWeight: theme.typography.fontWeights.bold,
                      }}
                    >
                      {filterValuesLength}
                    </Text>
                  </View>
                  <View style={styles.filterSeparator} />
                </>
              )}

              <Text
                style={[
                  styles.filterLabel,
                  {
                    color: theme.colors.text.tertiary,
                    fontSize: theme.typography.fontSizes.md,
                  },
                ]}
              >
                {label}
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
    minWidth: 25,
    height: 25,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  filterSeparator: {
    borderLeftWidth: 1,
    borderColor: '#D0D0D0',
    paddingLeft: 8,
    height: 25,
  },
  filterLabel: {
    textTransform: 'capitalize',
  },
});
