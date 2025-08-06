import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import { useTheme } from '../../theme/useTheme';

export default function Marketplace() {
  const theme = useTheme();

  const navigateToSellForm = () => {
    router.push('/sell-form');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <Button title="Sell a card" onPress={navigateToSellForm} />
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
