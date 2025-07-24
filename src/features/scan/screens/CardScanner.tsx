import { Circle, X } from 'lucide-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScanCard } from '../hooks/mutations/useScanCard';
import { useRouter } from 'expo-router';
import { ScannerState } from '../types';
import { getScannerStatusText, isErrorState, isLoadingState } from '../utils/scan-utils';
import { SCREEN_DIMENSIONS, FRAME_WIDTH, FRAME_HEIGHT } from '../../../constants';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '../../../components/ui';

export default function CardScanner() {
  const router = useRouter();
  const ref = useRef<CameraView>(null);
  const facing: CameraType = 'back';
  const [permission, requestPermission] = useCameraPermissions();
  const [scannerState, setScannerState] = useState<ScannerState>('ready');
  const { mutate: scanCard, isPending: isAnalyzing } = useScanCard();

  // Request camera permission if needed
  React.useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleTakePhoto = useCallback(async () => {
    // If already in error state, reset first
    if (isErrorState(scannerState)) {
      setScannerState('ready');
    }
    try {
      setScannerState('capturing');
      const photo = await ref.current?.takePictureAsync();

      setScannerState('analyzing');
      if (!photo) {
        console.warn('No photo captured');
        setScannerState('error_capture_failed');
        return;
      }
      scanCard(photo.uri, {
        onSuccess: (cards) => {
          if (cards && cards.length > 0) {
            router.push({
              pathname: '/scan-result',
              params: {
                resultType: 'success',
                cards: JSON.stringify(cards),
                highlightedCardId: cards[0].id,
              },
            });
            return setScannerState('ready'); // Reset state after successful scan
          }
          return setScannerState('error_not_detected');
        },
        onError: (error) => {
          console.warn('Error analyzing card:', error);
          setScannerState('error_not_detected');
        },
      });
    } catch (error) {
      console.warn('Capture failed:', error);
      setScannerState('error_capture_failed');
    }
  }, [scannerState, scanCard, router]);

  // Permission denied view
  if (!permission?.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Camera permission is required to use this feature.</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing={facing} ref={ref}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <X size={32} color="white" />
        </TouchableOpacity>

        <View
          style={[
            styles.frameOverlay,
            isErrorState(scannerState) ? styles.frameOverlayError : null,
          ]}
        />

        <View style={styles.textContainer}>
          <Text style={[styles.text, isErrorState(scannerState) ? styles.errorText : null]}>
            {getScannerStatusText(scannerState)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleTakePhoto}
          disabled={isLoadingState(scannerState) || isAnalyzing}
          activeOpacity={0.7}
        >
          <Circle
            size={64}
            color={isErrorState(scannerState) ? '#FF5252' : 'white'}
            opacity={isLoadingState(scannerState) || isAnalyzing ? 0.5 : 1}
          />
        </TouchableOpacity>
      </CameraView>
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
  errorText: {
    color: '#FF5252',
    fontWeight: 'bold',
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
    // Centered on screen
    top: SCREEN_DIMENSIONS.HEIGHT / 2.5 - FRAME_HEIGHT / 2.5,
    left: SCREEN_DIMENSIONS.WIDTH / 2 - FRAME_WIDTH / 2,
  },
  frameOverlayError: {
    borderColor: '#FF5252',
    borderWidth: 3,
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
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    padding: 16,
    borderRadius: 40,
    zIndex: 20,
  },
});
