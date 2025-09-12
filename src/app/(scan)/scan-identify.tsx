import { useRouter } from 'expo-router';
import CardIdentifyResult from '../../features/scan/screens/CardIdentifyResultScreen';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useScanContext } from '../../features/scan/context/ScanContext';

export default function CardIdentifyResultPage() {
  const theme = useTheme();
  const router = useRouter();
  const { scanCardData } = useScanContext();

  if (!scanCardData) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
        <Text style={{ color: theme.colors.text.primary }}>No scan data available</Text>
        <Button title="Back to scan" onPress={() => router.push('/scan?mode=identify')} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      <CardIdentifyResult
        croppedImage={scanCardData.frontCardCroppedImage || ''}
        name={scanCardData.name || ''}
        potentialMatchedCard={scanCardData.potentialMatchedCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
