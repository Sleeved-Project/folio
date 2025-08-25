import { ScrollView } from 'react-native';
import CardsForSale from '../components/CardsForSale';
import SearchButton from '../components/SearchButton';
import TopSellers from '../components/TopSellers';

export default function MarketplaceHome() {
  return (
    <>
      <SearchButton placeholderText="Search by card or seller" navigateTo="/(marketplace)/search" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </>
  );
}
