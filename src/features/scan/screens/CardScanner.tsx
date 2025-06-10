import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import type { CameraDevice } from 'react-native-vision-camera';
import type * as VisionCamera from 'react-native-vision-camera';

// Check if running in Expo Go
const isExpoGo = Constants.appOwnership === 'expo';

export default function CardScanner() {
  const [error, setError] = useState<Error | null>(null);
  const [cameraModule, setCameraModule] = useState<typeof VisionCamera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [device, setDevice] = useState<CameraDevice | null>(null);

  // Load camera module dynamically if not in Expo Go
  useEffect(() => {
    if (!isExpoGo) {
      import('react-native-vision-camera')
        .then((module) => {
          setCameraModule(module);

          // Initialize camera permissions and device
          const { useCameraPermission, useCameraDevice } = module;

          // Get permission status using a function since we can't use hooks directly here
          const checkPermission = async () => {
            try {
              const { requestPermission } = useCameraPermission();
              const status = await requestPermission();
              setHasPermission(status);
            } catch (err) {
              setError(
                err instanceof Error ? err : new Error('Failed to request camera permission')
              );
            }
          };

          // Get camera device
          const device = useCameraDevice('back');
          if (device) {
            setDevice(device);
          }

          // Check permission
          checkPermission();
        })
        .catch((err) => {
          setError(err instanceof Error ? err : new Error('Failed to load camera module'));
        });
    }
  }, []);

  // If in Expo Go, show the placeholder message
  if (isExpoGo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.mainText}>Camera scanning is not available in Expo Go</Text>
          <Text style={styles.subText}>This feature requires a development build</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Handle errors
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.mainText}>Something went wrong</Text>
          <Text style={styles.subText}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // While loading the camera module
  if (!cameraModule) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainText}>Initializing camera...</Text>
      </SafeAreaView>
    );
  }

  // Handle camera permission request
  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainText}>Camera permission is required to use this feature.</Text>
      </SafeAreaView>
    );
  }

  // No device found
  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainText}>No camera device found</Text>
      </SafeAreaView>
    );
  }

  // Camera view
  const { Camera } = cameraModule;
  return (
    <SafeAreaView style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
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
  errorContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    alignItems: 'center',
  },
  mainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subText: {
    color: '#ddd',
    fontSize: 14,
  },
});
