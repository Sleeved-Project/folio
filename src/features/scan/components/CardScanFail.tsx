import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Button } from '../../../components/ui';
import cardVerso from '../../../../assets/card-verso.png';

interface CardScanFailProps {
  setIsVisible: (visible: boolean) => void;
}

export default function CardScanFail({ setIsVisible }: CardScanFailProps) {
  return (
    <>
      <Image source={cardVerso} style={styles.image} />
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
