import { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import CardsForSale from '../components/CardsForSale';
import TopSellers from '../components/TopSellers';
import { ScrollView } from 'react-native';

export default function MarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="card or seller"
      />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </>
  );
}
