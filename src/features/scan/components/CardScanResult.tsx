import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CardScanResultProps {
  cardUri?: string;
  cardPrice?: number;
  cardId?: string;
}

export default function CardScanResult({ cardUri, cardPrice, cardId }: CardScanResultProps) {
  console.log('CardScanResult rendered with:', {
    cardUri,
    cardPrice,
    cardId,
  });
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <LinearGradient
        colors={['black', 'white']}
        style={styles.container}
        locations={[0.5, 0.8]}
      ></LinearGradient>
    </SafeAreaView>
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
