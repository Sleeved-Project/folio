import { useState } from 'react';
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
      <TopSellers />
      <CardsForSale />
    </>
  );
}
