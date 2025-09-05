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
          backgroundColor: theme.colors.background.tertiary,
          shadowColor: theme.shadows.small.shadowColor,
          shadowOffset: theme.shadows.small.shadowOffset,
          shadowOpacity: theme.shadows.small.shadowOpacity,
          shadowRadius: theme.shadows.small.shadowRadius,
          elevation: theme.shadows.small.elevation,
          borderRadius: theme.borderRadius.round,
          marginTop: theme.spacing.sm,
          marginBottom: theme.spacing.lg,
          height: 44,
        },
      ]}
    >
      <Search size={20} color={theme.colors.text.secondary} style={styles.searchIcon} />
      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.md,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 24,
    padding: 0,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
});
