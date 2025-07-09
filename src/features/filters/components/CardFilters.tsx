import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ChevronDown } from 'lucide-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFilterContext } from '../../../context/FilterContext';

interface CardFiltersProps {
  toggleFilterDetail: (label: string) => void;
}

export default function CardFilters({ toggleFilterDetail }: CardFiltersProps) {
  const theme = useTheme();

  const { filters, filtersOptions } = useFilterContext();

  return (
    <View>
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
                  padding: theme.spacing.md,
                  backgroundColor: theme.colors.background.tertiary,
                  borderRadius: theme.borderRadius.large,
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
    width: 25,
    height: 25,
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
