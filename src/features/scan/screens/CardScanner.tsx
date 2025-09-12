import { Circle, X } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScanCard } from '../hooks/mutations/useScanCard';
import { useScanCardIdentify } from '../hooks/mutations/useScanCardIdentify';
import { useRouter } from 'expo-router';
import { isErrorState, isLoadingState, getScannerStatusText } from '../utils/scan-utils';
import { SCREEN_DIMENSIONS, FRAME_WIDTH, FRAME_HEIGHT } from '../../../constants';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import ScanningAnimation from '../components/ScanningAnimation';
import { useScanContext } from '../context/ScanContext';
import { useCardCapture } from '../hooks/useCardCapture';
import { ScanService } from '../ScanService';
import CameraPermissionFallback from '../components/CameraPermissionFallback';

interface CardScannerProps {
  mode?: string | 'full' | 'identify-front-side' | 'identify-back-side';
}

export default function CardScanner({ mode = 'full' }: CardScannerProps) {
  const router = useRouter();
  const facing: CameraType = 'back';
  const [permission, requestPermission] = useCameraPermissions();

  const { setScanCardData } = useScanContext();
  const { mutate: scanCard, isPending: isAnalyzingScan } = useScanCard();
  const { mutate: scanCardIdentify, isPending: isAnalyzingIdentify } = useScanCardIdentify();

  const {
    cameraRef,
    scannerState,
    capturedPhotoUri,
    capturePhoto,
    resetCapture,
    setError,
    resetState,
  } = useCardCapture();

  const isAnalyzing = mode === 'full' ? isAnalyzingScan : isAnalyzingIdentify;

  // Request camera permission if needed
  React.useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleTakePhoto = useCallback(async () => {
    if (isAnalyzing) return;

    // Reset if in error state
    resetCapture();

    // Capture the photo
    const photoUri = await capturePhoto();
    if (!photoUri) return;

    // Process based on mode
    switch (mode) {
      case 'identify-front-side':
        scanCardIdentify(photoUri, {
          onSuccess: async (cardIdentify) => {
            await ScanService.processFrontSideScan(cardIdentify, router, setScanCardData);
            resetState();
          },
          onError: (error) => {
            console.warn('Error identifying card:', error);
            setError();
          },
        });
        break;

      case 'identify-back-side':
        scanCardIdentify(photoUri, {
          onSuccess: async (cardIdentify) => {
            await ScanService.processBackSideScan(cardIdentify, router, setScanCardData);
            resetState();
          },
          onError: (error) => {
            console.warn('Error identifying card:', error);
            setError();
          },
        });
        break;

      case 'full':
      default:
        scanCard(photoUri, {
          onSuccess: (cards) => {
            ScanService.processFullScan(cards, router);
            resetState();
          },
          onError: (error) => {
            console.warn('Error analyzing card:', error);
            setError();
          },
        });
        break;
    }
  }, [
    mode,
    isAnalyzing,
    scanCard,
    scanCardIdentify,
    router,
    setScanCardData,
    capturePhoto,
    resetCapture,
    resetState,
    setError,
  ]);

  // Permission denied view
  if (!permission?.granted) {
    return (
      <CameraPermissionFallback
        onRequestPermission={async () => {
          await requestPermission();
        }}
      />
    );
  }

  const isAnalyzingState = scannerState === 'analyzing';

  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing={facing} ref={cameraRef} />
      <View style={StyleSheet.absoluteFill}>
        {/* When analyzing, show the captured photo */}
        {isAnalyzingState && capturedPhotoUri && (
          <Image source={{ uri: capturedPhotoUri }} style={styles.capturedImage} />
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <X size={32} color="white" />
        </TouchableOpacity>
        <View
          style={[
            styles.frameOverlay,
            isErrorState(scannerState) ? styles.frameOverlayError : null,
          ]}
        />

        {isAnalyzingState ? (
          <>
            {/* Semi-transparent overlay outside the frame */}
            <View style={styles.frameOuterOverlay}>
              {/* This is a cut-out effect to highlight the frame area */}
            </View>

            <View style={styles.animationContainer}>
              <ScanningAnimation />
            </View>
          </>
        ) : (
          <View style={styles.textContainer}>
            <Text style={[styles.text, isErrorState(scannerState) ? styles.errorText : null]}>
              {getScannerStatusText(scannerState)}
            </Text>
          </View>
        )}

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  capturedImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
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
  frameOuterOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 9,
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
  animationContainer: {
    position: 'absolute',
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    top: SCREEN_DIMENSIONS.HEIGHT / 2.5 - FRAME_HEIGHT / 2.5,
    left: SCREEN_DIMENSIONS.WIDTH / 2 - FRAME_WIDTH / 2,
    zIndex: 15,
    overflow: 'hidden',
  },
});
