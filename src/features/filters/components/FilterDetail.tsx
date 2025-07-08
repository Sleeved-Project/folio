import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import FilterOption from './FilterOption';
import { Filters } from '../types';
import { useEffect, useState } from 'react';
import { useFilterDrawerAnimation } from '../hooks/useFilterDrawerAnimation';
import AnimatedFilterDrawer from './AnimatedFilterDrawer';
import { Check } from 'lucide-react-native';
import { Dimensions } from 'react-native';

interface FilterDetailProps {
  isFilterDetailVisible: boolean;
  setIsFilterDetailVisible: (isVisible: boolean) => void;
  filtersOptions: {
    label: string;
    values: { id: string; label: string }[];
  };
  filters?: Filters;
  setFilters?: (filters: Filters) => void;
}

export default function FilterDetail({
  isFilterDetailVisible,
  setIsFilterDetailVisible,
  filtersOptions,
  filters,
  setFilters,
}: FilterDetailProps) {
  const theme = useTheme();
  const { isCollapsed, gestureHandler, drawerAnimatedStyle, toggleDrawer } =
    useFilterDrawerAnimation();
  const [allFiltersChecked, setAllFiltersChecked] = useState(false);

  useEffect(() => {
    if (isFilterDetailVisible && isCollapsed) {
      toggleDrawer();
      setIsFilterDetailVisible(false);
    }
  }, [isFilterDetailVisible, isCollapsed]);

  useEffect(() => {
    const currentFiltersValueLength = filters?.find(
      (filter) => filter.label === filtersOptions.label
    )?.values.length;
    if (currentFiltersValueLength === filtersOptions.values.length) {
      setAllFiltersChecked(true);
    } else {
      setAllFiltersChecked(false);
    }
  }, [filters]);

  const handleToggleAllFilters = () => {
    if (!setFilters) return;

    const currentFilters = filters ?? [];

    const existingIndex = currentFilters.findIndex((filter) => {
      return filter.label === filtersOptions.label;
    });
    // If the filter with this label doesn't exist, we add it with all values
    if (existingIndex === -1) {
      setFilters([
        ...currentFilters,
        { label: filtersOptions.label, values: filtersOptions.values.map((v) => v.id) },
      ]);
      setAllFiltersChecked(true);
      return;
    }
    // If it exists, we remove it
    setAllFiltersChecked(false);
    setFilters(currentFilters.filter((_, i) => i !== existingIndex));
  };

  return (
    <AnimatedFilterDrawer
      gestureHandler={gestureHandler}
      animatedStyle={drawerAnimatedStyle}
      onDragHandlePress={toggleDrawer}
      style={styles.container}
    >
      <View
        style={[
          styles.content,
          {
            backgroundColor: theme.colors.background.primary,
          },
        ]}
      >
        <View style={styles.labelContainer}>
          <Text style={{ color: theme.colors.text.primary, fontSize: 18, fontWeight: 'bold' }}>
            {filtersOptions?.label}
          </Text>
          <TouchableOpacity
            onPress={handleToggleAllFilters}
            style={[
              styles.checkBoxContainer,
              {
                borderColor: theme.colors.border.black,
                borderRadius: theme.borderRadius.small,
              },
            ]}
          >
            {allFiltersChecked ? (
              <Check color={theme.colors.success} width={16} height={16} />
            ) : null}
          </TouchableOpacity>
        </View>
        <ScrollView style={{ marginTop: 16 }}>
          {filtersOptions?.values.map((value, index) => (
            <FilterOption
              key={index + value.label}
              value={value}
              isChecked={
                filters?.some(
                  (filter) =>
                    filter.label === filtersOptions.label && filter.values.includes(value.id)
                ) ?? false
              }
              updateFiltersCallback={(newFilter: string) => {
                if (!setFilters) return;

                const currentFilters = filters ?? [];
                const existingIndex = currentFilters.findIndex(
                  (filter) => filter.label === filtersOptions.label
                );

                // If filter with this label doesn't exist, we add it
                if (existingIndex === -1) {
                  setFilters([
                    ...currentFilters,
                    { label: filtersOptions.label, values: [newFilter] },
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
    </AnimatedFilterDrawer>
  );
}

const styles = StyleSheet.create({
  container: {
    left: -16,
    width: Dimensions.get('window').width,
  },
  content: {
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
