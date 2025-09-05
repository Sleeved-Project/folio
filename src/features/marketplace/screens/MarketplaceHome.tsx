import { Button, ScrollView, View } from 'react-native';
import CardsForSale from '../components/CardsForSale';
import TopSellers from '../components/TopSellers';
import { router } from 'expo-router';

export default function MarketplaceHome() {
  const navigateToSellForm = () => {
    router.push('/sell-form');
  };

  return (
    <View>
      <Button title="Sell a card" onPress={navigateToSellForm} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </View>
  );
}
