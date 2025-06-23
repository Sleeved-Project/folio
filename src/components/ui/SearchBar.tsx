import { Search } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { debounce } from 'lodash';
import { useTheme } from '../../theme/useTheme';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const theme = useTheme();

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
        },
      ]}
    >
      <Search color={theme.colors.text.tertiary} />
      <TextInput
        style={[styles.input, { color: theme.colors.text.primary }]}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Search"
        placeholderTextColor={theme.colors.text.tertiary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
