import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Button } from '../../../components/ui';

interface CardScanSuccessProps {
  cardUri?: string;
  cardPrice?: number;
  cardId?: string;
  setIsVisible: (visible: boolean) => void;
}

export default function CardScanSuccess({
  cardUri,
  cardPrice,
  cardId,
  setIsVisible,
}: CardScanSuccessProps) {
  console.log('CardScanSuccess rendered with:', {
    cardUri,
    cardPrice,
    cardId,
  });

  return (
    <>
      <Image source={{ uri: cardUri }} style={styles.image} />
      <View style={styles.actionContainer}>
        <Text style={styles.text}>Oops no card match found !</Text>
        <Button
          title={'Scan again'}
          variant="scan"
          onPress={() => setIsVisible(false)}
          buttonStyle={styles.actionButton}
          textStyle={styles.textStyle}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    width: '100%',
  },
  actionButton: {
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  textStyle: {
    color: '#111',
  },
  image: {
    width: 345,
    height: 480,
  },
});
