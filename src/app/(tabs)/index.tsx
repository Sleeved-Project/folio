import { useState } from 'react';
import SearchResults from '../../components/ui/modal/SearchResults';
import SearchBar from '../../components/ui/SearchBar';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import ScreenContainer from '../../components/ui/ScreenContainer';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'sellers'>('cards');
  const isSearching = searchQuery.trim().length > 0;
  const theme = useTheme();

  return (
    <ScreenContainer
      title="Marketplace"
      accessible
      accessibilityLabel="Marketplace Screen"
      accessibilityHint="Browse cards and sellers or search for specific items"
    >
      <View style={{ flex: 1 }}>
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
    </ScreenContainer>
  );
}
