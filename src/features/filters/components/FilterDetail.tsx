import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import FilterOption from './FilterOption';
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react-native';
import { useFilterContext } from '../../../context/FilterContext';

export default function FilterDetail() {
  const theme = useTheme();
  const [allFiltersChecked, setAllFiltersChecked] = useState(false);
  const { selectedFilterOption, filters, setFilters } = useFilterContext();
  const label = selectedFilterOption ? Object.keys(selectedFilterOption)[0] : '';
  const values = selectedFilterOption ? selectedFilterOption[label] : [];

  useEffect(() => {
    const currentFiltersValueLength = filters?.find((filter) => filter.label === label)?.values
      .length;
    if (currentFiltersValueLength === values.length) {
      setAllFiltersChecked(true);
    } else {
      setAllFiltersChecked(false);
    }
  }, [filters]);

  const handleToggleAllFilters = () => {
    if (!setFilters) return;

    const currentFilters = filters ?? [];

    const existingIndex = currentFilters.findIndex((filter) => {
      return filter.label === label;
    });
    // If the filter with this label doesn't exist, we add it with all values
    if (existingIndex === -1) {
      setFilters([...currentFilters, { label: label, values: values.map((v) => v.id) }]);
      setAllFiltersChecked(true);
      return;
    }
    // If it exists, we remove it
    setAllFiltersChecked(false);
    setFilters(currentFilters.filter((_, i) => i !== existingIndex));
  };

  return (
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
          {label}
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
          {allFiltersChecked ? <Check color={theme.colors.success} width={16} height={16} /> : null}
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 16 }}>
        {values.map((value, index) => (
          <FilterOption
            key={index + value.id.toString()}
            value={value}
            isChecked={
              filters?.some(
                (filter) => filter.label === label && filter.values.includes(value.id)
              ) ?? false
            }
            updateFiltersCallback={(newFilter: number) => {
              if (!setFilters) return;

              const currentFilters = filters ?? [];
              const existingIndex = currentFilters.findIndex((filter) => filter.label === label);

              if (existingIndex === -1) {
                setFilters([...currentFilters, { label: label, values: [value.id] }]);
                return;
              }

              const existingFilter = currentFilters[existingIndex];
              const valueExists = existingFilter.values.includes(newFilter);

              if (valueExists) {
                const updatedValues = existingFilter.values.filter((v) => v !== newFilter);
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  content: {},
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
