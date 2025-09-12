import { useCallback, useState, useRef } from 'react';
import { ScannerState } from '../types';
import { isErrorState } from '../utils/scan-utils';
import { CameraView } from 'expo-camera';

export function useCardCapture() {
  const cameraRef = useRef<CameraView>(null);
  const [scannerState, setScannerState] = useState<ScannerState>('ready');
  const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(null);

  const capturePhoto = useCallback(async () => {
    try {
      setScannerState('capturing');
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.4,
        base64: false,
        skipProcessing: false,
      });

      if (!photo) {
        console.warn('No photo captured');
        setScannerState('error_capture_failed');
        return null;
      }

      setCapturedPhotoUri(photo.uri);
      setScannerState('analyzing');
      return photo.uri;
    } catch (error) {
      console.warn('Capture failed:', error);
      setCapturedPhotoUri(null);
      setScannerState('error_capture_failed');
      return null;
    }
  }, []);

  const resetCapture = useCallback(() => {
    if (isErrorState(scannerState)) {
      setScannerState('ready');
      setCapturedPhotoUri(null);
    }
  }, [scannerState]);

  const setError = useCallback(() => {
    setCapturedPhotoUri(null);
    setScannerState('error_not_detected');
  }, []);

  const resetState = useCallback(() => {
    setCapturedPhotoUri(null);
    setScannerState('ready');
  }, []);

  return {
    cameraRef,
    scannerState,
    capturedPhotoUri,
    capturePhoto,
    resetCapture,
    setError,
    resetState,
  };
}
