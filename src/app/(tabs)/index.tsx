import { StyleSheet, View } from 'react-native';
import MarketplaceHome from '../../features/marketplace/screens/MarketplaceHome';
import { useTheme } from '../../theme/useTheme';

export default function Marketplace() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
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
