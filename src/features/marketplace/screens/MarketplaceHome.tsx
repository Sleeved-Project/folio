import { ScrollView, View } from 'react-native';
import CardsForSale from '../components/CardsForSale';
import SearchButton from '../components/SearchButton';
import TopSellers from '../components/TopSellers';

interface MarketplaceHomeProps {
  onSearchClick: () => void;
}

export default function MarketplaceHome({ onSearchClick }: MarketplaceHomeProps) {
  return (
    <View>
      <SearchButton placeholderText="Search by card or seller" onPress={onSearchClick} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </View>
  );
}
