import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import AnimatedDrawer from '../../cards/components/AnimatedDrawer';
import { useDrawerAnimation } from '../../cards/hooks/useDrawerAnimation';
import FilterOption from './FilterOption';
import { Filters } from '../types';
import { useEffect } from 'react';

interface FilterDetailProps {
  isFilterDetailVisible: boolean;
  setIsFilterDetailVisible: (isVisible: boolean) => void;
  filterOptions: {
    label: string;
    values: string[];
  };
  filters?: Filters;
  setFilters?: (filters: Filters) => void;
}

export default function FilterDetail({
  isFilterDetailVisible,
  setIsFilterDetailVisible,
  filterOptions,
  filters,
  setFilters,
}: FilterDetailProps) {
  const theme = useTheme();
  const { isCollapsed, gestureHandler, drawerAnimatedStyle, toggleDrawer } = useDrawerAnimation({
    isFilterView: true,
  });

  useEffect(() => {
    if (isFilterDetailVisible && isCollapsed) {
      toggleDrawer();
      setIsFilterDetailVisible(false);
    }
  }, [isFilterDetailVisible, isCollapsed]);

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
        <View style={styles.labelContainer}>
          <Text style={{ color: theme.colors.text.primary, fontSize: 18, fontWeight: 'bold' }}>
            {filterOptions?.label}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (!setFilters) return;
              const currentFilters = filters ?? [];

              // If the filter is already selected, we remove it
              const existingIndex = filters?.findIndex(
                (filter) => filter.label === filterOptions.label
              );

              setFilters(currentFilters.filter((_, i) => i !== existingIndex));
            }}
            style={[
              styles.checkBoxContainer,
              {
                borderColor: theme.colors.border.black,
                borderRadius: theme.borderRadius.small,
              },
            ]}
          ></TouchableOpacity>
        </View>
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
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    width: 24,
    height: 24,
  },
});
