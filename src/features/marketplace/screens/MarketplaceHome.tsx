import { useState } from 'react';
import { Button, ScrollView } from 'react-native';
import SearchBar from '../../../components/ui/SearchBar';
import CardsForSale from '../components/CardsForSale';
import TopSellers from '../components/TopSellers';
import { useRouter } from 'expo-router';

export default function MarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="card or seller"
      />
      <Button
        title="ad detail (tododelete)"
        onPress={() => router.push('/(marketplace)/ad-detail')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </>
  );
}
