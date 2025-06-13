import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from '../../cards/types';

interface AdditionalResultsScanProps {
  cards?: Card[];
}

export default function AdditionalResultsScan({ cards }: AdditionalResultsScanProps) {
  console.log('AdditionalResultsScan rendered with cards:', cards);

  return (
    <View style={styles.container}>
      <Text>Additional Results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
