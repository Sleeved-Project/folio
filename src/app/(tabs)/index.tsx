import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import { useTheme } from '../../theme/useTheme';
import SearchModal from '../../components/ui/modal/SearchModal';
import { router } from 'expo-router';

export default function Marketplace() {
  const theme = useTheme();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const navigateToSellForm = () => {
    router.push('/sell-form');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <SearchModal
        visible={isSearchActive}
        onClose={() => {
          setIsSearchActive(false);
          Keyboard.dismiss();
        }}
      />
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <Button title="Sell a card" onPress={navigateToSellForm} />
        <MarketplaceHome onSearchClick={() => setIsSearchActive(true)} />
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
