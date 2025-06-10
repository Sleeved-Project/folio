import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCameraPermission, Camera, useCameraDevice } from 'react-native-vision-camera';

export default function CardScanner() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  if (hasPermission === false) {
    requestPermission();
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Camera permission is required to use this feature.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {device && <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
