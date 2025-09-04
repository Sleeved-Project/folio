import { useState } from 'react';
import { ScrollView } from 'react-native';
import SearchBar from '../../../components/ui/SearchBar';
import CardsForSale from '../components/CardsForSale';
import TopSellers from '../components/TopSellers';

export default function MarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="card or seller"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </>
  );
}
