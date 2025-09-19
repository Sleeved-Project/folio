import { Search, X } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { debounce } from 'lodash';
import { useTheme } from '../../theme/useTheme';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchPlaceholder?: string;
  showClearButton?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string; 
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchPlaceholder = 'name',
  showClearButton = true,
  accessibilityLabel,
  accessibilityHint,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const theme = useTheme();
  const placeholderText = `${searchPlaceholder}`;

  // Debounced query update
  const debouncedSetSearchQuery = useRef(
    debounce((query: string) => setSearchQuery(query), 1000)
  ).current;

  useEffect(() => {
    debouncedSetSearchQuery(inputValue);
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [inputValue, debouncedSetSearchQuery]);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleClear = () => {
    setInputValue('');
    setSearchQuery('');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.large,
          marginBottom: theme.spacing.sm,
          height: 48,
          shadowColor: theme.shadows.small.shadowColor,
          shadowOffset: theme.shadows.small.shadowOffset,
          shadowOpacity: theme.shadows.small.shadowOpacity,
          shadowRadius: theme.shadows.small.shadowRadius,
          elevation: theme.shadows.small.elevation,
        },
      ]}
      accessible
      accessibilityRole="search"
      accessibilityLabel={accessibilityLabel || `Search bar: ${placeholderText}`}
      accessibilityHint={accessibilityHint || 'Type your search query here'}
    >
      {/* Search icon */}
      <Search size={20} color={theme.colors.text.secondary} style={styles.searchIcon} accessible={false} />

      {/* Input field */}
      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.medium,
            backgroundColor: 'transparent',
          },
        ]}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={placeholderText}
        placeholderTextColor={theme.colors.text.secondary}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        accessible
        accessibilityLabel={`Search input: ${placeholderText}`}
        accessibilityHint="Enter text to search"
      />

      {/* Clear button */}
      {showClearButton && inputValue.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          accessibilityHint="Clears the search input"
        >
          <X size={18} color={theme.colors.text.secondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'relative',
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 28,
    padding: 0,
  },
  clearButton: {
    padding: 6,
    marginLeft: 8,
    borderRadius: 8,
  },
});
