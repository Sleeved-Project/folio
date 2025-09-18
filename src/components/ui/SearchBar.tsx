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
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchPlaceholder = 'name',
  showClearButton = true,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const theme = useTheme();
  const placeholderText = `${searchPlaceholder}`;

  // We are debouncing the query to avoid too many updates, it will only be sent after 1 second of inactivity
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
    >
      <Search size={22} color={theme.colors.primary} style={styles.searchIcon} />
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
      />
      {showClearButton && inputValue.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={18} color={theme.colors.primaryForeground} />
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
