import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import FilterOption from './FilterOption';
import { useEffect, useState } from 'react';
import { Check, Minus } from 'lucide-react-native';
import { useFilterContext } from '../../../context/FilterContext';
import BackButton from '../../../components/ui/BackButton';
import { FilterTypeEnum } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../../components/ui/SearchBar';

interface FilterDetailProps {
  filterType: FilterTypeEnum;
}

export default function FilterDetail({ filterType }: FilterDetailProps) {
  const theme = useTheme();
  const [allFiltersChecked, setAllFiltersChecked] = useState(false);
  const {
    selectedFilterOption,
    cardFilters,
    setCardFilters,
    cardSetFilters,
    setCardSetFilters,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    artistName,
    setArtistName,
  } = useFilterContext();

  const label = Object.keys(selectedFilterOption)[0];
  const values = selectedFilterOption[label];

  const filtersStateMapping = {
    card: cardFilters,
    set: cardSetFilters,
  };

  const setFiltersStateMapping = {
    card: setCardFilters,
    set: setCardSetFilters,
  };

  const filters = filtersStateMapping[filterType];
  const setFilters = setFiltersStateMapping[filterType];

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
    // if (existingIndex === -1) {
    //   setFilters([...currentFilters, { label: label, values: values.map((v) => v.id) }]);
    //   setAllFiltersChecked(true);
    //   return;
    // }
    // If it exists, we remove it
    setAllFiltersChecked(false);
    setFilters(currentFilters.filter((_, i) => i !== existingIndex));
  };

  const displayFilterOptions = (item: { id: number; value: string }) => {
    return (
      <FilterOption
        option={item}
        isChecked={
          filters?.some((filter) => filter.label === label && filter.values.includes(item.id)) ??
          false
        }
        updateFiltersCallback={(newFilter: number) => {
          if (!setFilters) return;

          const currentFilters = filters ?? [];
          const existingIndex = currentFilters.findIndex((filter) => filter.label === label);

          if (existingIndex === -1) {
            setFilters([...currentFilters, { label: label, values: [newFilter] }]);
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
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background.primary,
          },
        ]}
      >
        <View style={styles.labelContainer}>
          <BackButton />
          <Text
            style={[
              styles.filterLabel,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.bold,
              },
            ]}
          >
            {label}
          </Text>
          <TouchableOpacity
            onPress={handleToggleAllFilters}
            style={[
              styles.checkBoxContainer,
              {
                borderColor: theme.colors.border.black,
                borderRadius: theme.borderRadius.small,
                backgroundColor: allFiltersChecked
                  ? theme.colors.text.black
                  : theme.colors.background.primary,
              },
            ]}
          >
            {allFiltersChecked ? (
              <Check color={theme.colors.background.primary} width={18} height={18} />
            ) : (
              <Minus color={theme.colors.text.primary} width={18} height={18} />
            )}
          </TouchableOpacity>
        </View>
        {label === 'artists' && (
          <SearchBar searchQuery={artistName} setSearchQuery={setArtistName} />
        )}
        <FlatList
          data={values}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => displayFilterOptions(item)}
          contentContainerStyle={{ paddingBottom: 16 }}
          style={{ marginTop: 16 }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            // Should only fetch if the filter is artists
            if (label === 'artists' && hasNextPage && !isFetchingNextPage && fetchNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    gap: 8,
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
  filterLabel: {
    textTransform: 'capitalize',
  },
});
