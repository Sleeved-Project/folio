import { ScrollView, View, StyleSheet } from 'react-native';
import CardsForSale from '../components/CardsForSale';
import TopSellers from '../components/TopSellers';
import { router } from 'expo-router';
import { useHasStripeAccount } from '../hooks/useHasStripeAccount';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';
import { Button } from '../../../components/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MarketplaceHome() {
  const { data: hasStripeAccount, refetch: refetchHasStripeAccount } = useHasStripeAccount();
  const insets = useSafeAreaInsets();

  useRefetchOnFocus(refetchHasStripeAccount);

  const navigateToStripeSetup = () => {
    if (!hasStripeAccount) {
      router.push('/stripe-setup');
    } else {
      router.push('/sell-form');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
      >
        <Button title="Sell a card" onPress={navigateToStripeSetup} />

        <TopSellers />
        <CardsForSale />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
