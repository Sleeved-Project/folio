import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchResults from '../../components/ui/modal/SearchResults';
import SearchBar from '../../components/ui/SearchBar';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import { useTheme } from '../../theme/useTheme';

export default function Marketplace() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'sellers'>('cards');

  const isSearching = searchQuery.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder={
            isSearching
              ? activeTab === 'cards'
                ? 'Search by card'
                : 'Search by seller'
              : 'Search...'
          }
          showClearButton
        />
        {isSearching ? (
          <SearchResults
            searchQuery={searchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <MarketplaceHome />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
});
