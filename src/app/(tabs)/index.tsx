// import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import { useTheme } from '../../theme/useTheme';

export default function Marketplace() {
  const theme = useTheme();

  // const navigateToSellForm = () => {
  //   router.push('/sell-form');
  // };

  const createStripeAccount = async () => {
    try {
      const stripeAccount = await fetch('http://192.168.0.33:8082/api/v1/payment/account', {
        method: 'POST',
      });
      console.log('Stripe account created:', await stripeAccount.json());
      // const { url } = await stripeAccount.json();
      // Linking.openURL(url);
    } catch (error) {
      console.error('Error creating Stripe account:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <Button title="Create" onPress={createStripeAccount} />
        {/* <Button title="Sell a card" onPress={navigateToSellForm} /> */}
        <MarketplaceHome />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
