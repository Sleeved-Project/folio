import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import cardVerso from '../../../../assets/card-verso.png';
import { useRouter } from 'expo-router';
import { Button } from '../../../components/ui';

export default function CardScanFail() {
  const router = useRouter();
  return (
    <>
      <Image source={cardVerso} style={styles.image} />
      <View style={styles.actionContainer}>
        <Text style={styles.text}>Oops no card match found !</Text>
        <Button
          title="Scan again"
          variant="scan"
          onPress={() => router.replace('/scan')}
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
    backgroundColor: '#EFF1F5',
    padding: 16,
    borderRadius: 12,
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
    borderRadius: 16,
  },
});
