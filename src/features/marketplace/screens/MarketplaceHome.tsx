import { ScrollView, View } from 'react-native';
import CardsForSale from '../components/CardsForSale';
import TopSellers from '../components/TopSellers';
import { router } from 'expo-router';
import { Button } from '../../../components/ui';
import { useHasStripeAccount } from '../hooks/useHasStripeAccount';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';

export default function MarketplaceHome() {
  const { data: hasStripeAccount, refetch: refetchHasStripeAccount } = useHasStripeAccount();

  useRefetchOnFocus(refetchHasStripeAccount);

  const navigateToStripeSetup = () => {
    if (!hasStripeAccount) {
      router.push('/stripe-setup');
    } else {
      router.push('/sell-form');
    }
    router.push('/sell-form');
  };

  return (
    <View>
      <Button title="Sell a card" onPress={navigateToStripeSetup} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </View>
  );
}
