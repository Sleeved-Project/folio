import React from 'react';
import { Text, StyleSheet, View, Modal, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../../components/ui';
import cardVerso from '../../../../assets/card-verso.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

interface CardNotFoundProps {
  visible?: boolean;
  setIsVisible: (visible: boolean) => void;
}

export default function CardNotFound({ visible, setIsVisible }: CardNotFoundProps) {
  return (
    <Modal visible={visible} transparent={false} backdropColor={'black'} animationType="fade">
      <SafeAreaView style={styles.safeAreaView}>
        <LinearGradient colors={['black', 'white']} style={styles.container} locations={[0.5, 0.8]}>
          <Image source={cardVerso} style={styles.image} />
          <View style={styles.actionContainer}>
            <Text style={styles.text}>Oops no card match found !</Text>
            <Link href="/scan/scan-result" style={{ width: '100%' }}>
              Go to scan result
            </Link>
            <Button
              title={'Scan again'}
              variant="scan"
              onPress={() => setIsVisible(false)}
              buttonStyle={styles.actionButton}
              textStyle={styles.textStyle}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  safeAreaView: { flex: 1, backgroundColor: 'transparent' },
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
