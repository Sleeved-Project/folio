import { Search } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { debounce } from 'lodash';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchQuery);

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
    <View style={styles.container}>
      <Search color={'#A09CAB'} />
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Search"
        placeholderTextColor={'#A09CAB'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EFF1F5',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
});
