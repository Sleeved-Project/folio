import React from 'react';
import { Text, StyleSheet, View, Modal, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../../components/ui';
import cardVerso from '../../../../assets/card-verso.png';

interface CardNotFoundProps {
  visible?: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function CardNotFound({ visible, setIsVisible }: CardNotFoundProps) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={cardVerso} style={styles.image} />
        </View>
        <LinearGradient colors={['black', 'white']} style={styles.background}>
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
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  imageContainer: {
    zIndex: 1,
  },
  image: {
    width: 345,
    height: 480,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 600,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  actionButton: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
  },
});
