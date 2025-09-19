import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CardScanFail from '../components/CardScanFail';
import CardScanSuccess from '../components/CardScanSuccess';
import { Card } from '../../cards/types';
import { useTheme } from '../../../theme/useTheme';

interface CardScanResultProps {
  resultType: 'success' | 'fail';
  cards?: Card[];
  highlightedCardId: string;
}

export default function CardScanResult({
  resultType,
  cards,
  highlightedCardId,
}: CardScanResultProps) {
  const theme = useTheme();

  return (
    <View
      style={styles.safeAreaView}
      accessible
      accessibilityLabel="Card scan result screen"
    >
      <LinearGradient
        colors={[
          theme.colors.variants.primaryLight,
          theme.colors.background.secondary,
          theme.colors.background.primary,
        ]}
        style={styles.container}
        locations={[0, 0.6, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        accessible
        accessibilityLabel={
          resultType === 'success'
            ? 'Card scan successful'
            : 'Card scan failed'
        }
      >
        {resultType === 'success' && cards ? (
          <View
            accessible
            accessibilityLabel={`Scan success: ${cards.length} cards detected. Highlighted card ID: ${highlightedCardId}`}
          >
            <CardScanSuccess cards={cards} highlightedCardId={highlightedCardId} />
          </View>
        ) : (
          <View
            accessible
            accessibilityLabel="Scan failed: No matching cards found"
          >
            <CardScanFail />
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  safeAreaView: { flex: 1, backgroundColor: 'transparent' },
});
