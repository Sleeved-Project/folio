import { StyleSheet, View } from 'react-native';
import CardsList from '../../features/cards/screens/CardsList';
import { useTheme } from '../../theme/useTheme';

export default function Index() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <CardsList isFiltersVisible={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
