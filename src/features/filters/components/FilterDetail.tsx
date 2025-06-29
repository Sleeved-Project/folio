import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedDrawer from '../../cards/components/AnimatedDrawer';
import { useDrawerAnimation } from '../../cards/hooks/useDrawerAnimation';
import FilterOption from './FilterOption';
import { Filters } from '../types';

interface FilterDetailProps {
  isFilterDetailVisible: boolean;
  filterOptions: {
    label: string;
    values: string[];
  };
  filters?: Filters;
  setFilters?: (filters: Filters) => void;
}

export default function FilterDetail({
  isFilterDetailVisible,
  filterOptions,
  filters,
  setFilters,
}: FilterDetailProps) {
  const theme = useTheme();
  console.log('setIsFilterDetailVisible:', isFilterDetailVisible);

  const { gestureHandler, drawerAnimatedStyle, toggleDrawer } = useDrawerAnimation();

  return (
    <AnimatedDrawer
      gestureHandler={gestureHandler}
      animatedStyle={drawerAnimatedStyle}
      onDragHandlePress={toggleDrawer}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background.primary,
          },
        ]}
      >
        <Text style={{ color: theme.colors.text.primary, fontSize: 18, fontWeight: 'bold' }}>
          {filterOptions?.label}
        </Text>
        <ScrollView style={{ marginTop: 16 }}>
          {filterOptions?.values.map((value, index) => (
            <FilterOption
              key={index + value}
              value={value}
              updateFiltersCallback={(newFilter: string) => {
                if (!setFilters) return;

                const currentFilters = filters ?? [];
                const existingIndex = currentFilters.findIndex(
                  (filter) => filter.label === filterOptions.label
                );

                // If filter with this label doesn't exist, we add it
                if (existingIndex === -1) {
                  setFilters([
                    ...currentFilters,
                    { label: filterOptions.label, values: [newFilter] },
                  ]);
                  return;
                }

                const existingFilter = currentFilters[existingIndex];
                const valueExists = existingFilter.values.includes(newFilter);

                if (valueExists) {
                  const updatedValues = existingFilter.values.filter((v) => v !== newFilter);

                  // We don't want empty filter values, so we remove the entire filter
                  if (updatedValues.length === 0) {
                    setFilters(currentFilters.filter((_, i) => i !== existingIndex));
                  } else {
                    const updatedFilters = [...currentFilters];
                    updatedFilters[existingIndex] = {
                      ...existingFilter,
                      values: updatedValues,
                    };
                    setFilters(updatedFilters);
                  }
                } else {
                  // If the value doesn't exist then we add it
                  const updatedFilters = [...currentFilters];
                  updatedFilters[existingIndex] = {
                    ...existingFilter,
                    values: [...existingFilter.values, newFilter],
                  };
                  setFilters(updatedFilters);
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
    </AnimatedDrawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
