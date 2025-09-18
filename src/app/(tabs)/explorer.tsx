import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import CardsList from '../../features/cards/screens/CardsList';

export default function Explorer() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      accessible
      accessibilityLabel="Explorer Screen"
      accessibilityHint="Browse and discover cards"
    >
      <View
        style={[styles.content, { backgroundColor: theme.colors.background.primary }]}
        accessible
        accessibilityLabel="Cards list container"
        accessibilityHint="Displays the list of cards and card sets"
      >
        <CardsList isFiltersVisible={true} />
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
