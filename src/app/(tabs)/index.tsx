import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchResults from '../../components/ui/modal/SearchResults';
import SearchBar from '../../components/ui/SearchBar';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import { useTheme } from '../../theme/useTheme';
import { Button } from '../../components/ui';

export default function Marketplace() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'sellers'>('cards');

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

  const isSearching = searchQuery.trim().length > 0;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Button title="Create" onPress={createStripeAccount} />
        {/* <Button title="Sell a card" onPress={navigateToSellForm} /> */}

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder={
            isSearching
              ? activeTab === 'cards'
                ? 'Search by card'
                : 'Search by seller'
              : 'Search...'
          }
          showClearButton
        />
        {isSearching ? (
          <SearchResults
            searchQuery={searchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <MarketplaceHome />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
});
