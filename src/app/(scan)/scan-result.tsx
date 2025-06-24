import { useLocalSearchParams } from 'expo-router';
import CardScanResult from '../../features/scan/screens/CardScanResult';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

export default function ScanResult() {
  const { resultType, cards, highlightedCardId } = useLocalSearchParams();
  const theme = useTheme();

  const parsedCards = cards ? JSON.parse(cards as string) : [];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      <CardScanResult
        resultType={resultType as 'success' | 'fail'}
        cards={parsedCards}
        highlightedCardId={highlightedCardId as string}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
