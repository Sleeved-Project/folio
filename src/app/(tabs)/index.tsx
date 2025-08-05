import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Button } from '../../components/ui';
import { router } from 'expo-router';

export default function Explorer() {
  const theme = useTheme();

  const navigateToSellForm = () => {
    router.push('/sell-form');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <Text>Marketplace</Text>
        <Button title="Sell a card" onPress={navigateToSellForm} />
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
