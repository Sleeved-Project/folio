import SearchResults from '../../components/ui/modal/SearchResults';
import SearchBar from '../../components/ui/SearchBar';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import { useState } from 'react';
import ScreenContainer from '../../components/ui/ScreenContainer';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'sellers'>('cards');
  const isSearching = searchQuery.trim().length > 0;

  return (
    <ScreenContainer title="Marketplace">
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
    </ScreenContainer>
  );
}
