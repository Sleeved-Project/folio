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
          const isActive = filterValuesLength > 0;

          return (
            <TouchableOpacity
              key={`${index}-${label}`}
              onPress={() => toggleFilterDetail(label)}
              activeOpacity={0.8}
              style={[
                styles.filterContainer,
                {
                  paddingVertical: theme.spacing.xs + 4,
                  paddingHorizontal: theme.spacing.md,
                  backgroundColor: theme.colors.background.secondary,
                  borderRadius: theme.borderRadius.large,
                  borderWidth: 2,
                  borderColor: isActive ? theme.colors.primary : theme.colors.border.light,
                  marginRight: theme.spacing.sm,
                  shadowColor: theme.shadows.small.shadowColor,
                  shadowOffset: theme.shadows.small.shadowOffset,
                  shadowOpacity: theme.shadows.small.shadowOpacity,
                  shadowRadius: theme.shadows.small.shadowRadius,
                  elevation: isActive
                    ? theme.shadows.medium.elevation
                    : theme.shadows.small.elevation,
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
              {isActive && (
                <>
                  <View
                    style={[
                      styles.filterNumber,
                      {
                        backgroundColor: theme.colors.variants.primaryLight,
                        borderRadius: theme.borderRadius.round,
                        borderWidth: 1,
                        borderColor: theme.colors.primary,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: theme.colors.primaryForeground,
                        fontSize: theme.typography.fontSizes.sm,
                        fontWeight: theme.typography.fontWeights.bold,
                      }}
                    >
                      {filterValuesLength}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.filterSeparator,
                      { borderLeftColor: theme.colors.primary, height: 20, marginHorizontal: 8 },
                    ]}
                  />
                </>
              )}

              <Text
                style={[
                  styles.filterLabel,
                  {
                    color: isActive ? theme.colors.primaryForeground : theme.colors.text.secondary,
                    fontSize: theme.typography.fontSizes.md,
                    fontWeight: isActive
                      ? theme.typography.fontWeights.semiBold
                      : theme.typography.fontWeights.medium,
                  },
                ]}
              >
                {label}
              </Text>

              <View style={styles.chevron}>
                <ChevronDown color={theme.colors.primary} size={18} />
              </View>
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
    paddingVertical: 6,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterNumber: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
  },
  filterSeparator: {
    borderLeftWidth: 1,
  },
  filterLabel: {
    textTransform: 'capitalize',
  },
  chevron: {
    marginLeft: 8,
    alignSelf: 'center',
  },
});
