import { Circle, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import Button from '../Button';
import { FRAME_HEIGHT, FRAME_WIDTH, SCREEN_DIMENSIONS } from '../../../constants';

interface PhotoCaptureModalProps {
  onPhotoTaken: (uri: string) => void;
  onClose: () => void;
  subtitle?: string;
}

export default function PhotoCaptureModal({
  onPhotoTaken,
  onClose,
  subtitle = 'Place your card here',
}: PhotoCaptureModalProps) {
  const ref = useRef<CameraView>(null);
  const facing: CameraType = 'back';

  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);

  const handleTakePhoto = useCallback(async () => {
    if (isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await ref.current?.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });

      if (photo?.uri) {
        onPhotoTaken(photo.uri);
      }
    } catch (error) {
      console.error('Photo capture failed:', error);
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing, onPhotoTaken, onClose]);

  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <X size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Camera permission is required to take photos.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing={facing} ref={ref} />
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <X size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.frameOverlay} />

      <View style={styles.textContainer}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity
        style={styles.captureButton}
        onPress={handleTakePhoto}
        disabled={isCapturing}
        activeOpacity={0.7}
      >
        <Circle size={64} color="white" opacity={isCapturing ? 0.5 : 1} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    padding: 12,
    zIndex: 20,
  },
  frameOverlay: {
    position: 'absolute',
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 16,
    zIndex: 10,
    // Centered on screen - même calcul que CardScanner
    top: SCREEN_DIMENSIONS.HEIGHT / 2.5 - FRAME_HEIGHT / 2.5,
    left: SCREEN_DIMENSIONS.WIDTH / 2 - FRAME_WIDTH / 2,
  },
  textContainer: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    padding: 16,
    borderRadius: 40,
    zIndex: 20,
  },
});
