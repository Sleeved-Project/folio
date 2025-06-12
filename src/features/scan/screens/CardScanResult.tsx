import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardScanFail from '../components/CardScanFail';
import CardScanSuccess from '../components/CardScanSuccess';
import { Card } from '../../cards/types';

interface CardScanResultProps {
  resultType: 'success' | 'fail';
  cards?: Card[];
}

export default function CardScanResult({ resultType, cards }: CardScanResultProps) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {resultType === 'success' && cards ? <CardScanSuccess cards={cards} /> : <CardScanFail />}
      </View>
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
