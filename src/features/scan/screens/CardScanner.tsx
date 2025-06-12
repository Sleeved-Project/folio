import { Circle, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';
import { Link } from 'expo-router';

export default function CardScanner() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  React.useEffect(() => {
    if (hasPermission === false) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const uploadPhoto = async (photo: Blob) => {
    setIsLoading(true);
    try {
      console.log('Uploading photo to Iris API...');
      console.log('Photo type:', typeof photo);

      const formData = new FormData();
      formData.append('file', photo, 'card_photo.jpg');
      console.log('FormData prepared:', formData);
      const response = await fetch('http://localhost:8000/api/v1/images/hash/file', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (!response.ok) {
        console.log("Navigate to '/scan-result' with error");
      }
      const data = await response.json();
      console.log('Photo uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        const result = await fetch(`file://${photo.path}`);
        const data = await result.blob();
        console.log('Photo taken:', data, typeof data);
        // Sending the photo to Atlas api
        await uploadPhoto(data);
      } catch (e) {
        console.warn('Failed to take photo:', e);
      }
    }
  };

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Camera permission is required to use this feature.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {device && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.cameraContainer}>
            <View style={styles.crossContainer}>
              <X size={32} color="white" />
            </View>
            <View style={styles.frameOverlay} />

            <View style={styles.controls}>
              {isLoading ? (
                <Text style={styles.text}>Analysing...</Text>
              ) : (
                <>
                  <Text style={styles.text}>Place your card here</Text>
                  <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
                    <Circle size={64} color="white" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </>
      )}
      <Link href="/scan-result" style={{ width: '100%', color: 'red' }}>
        Go to scan result
      </Link>
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
    fontSize: 18,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 32,
  },
  crossContainer: {
    alignSelf: 'flex-start',
  },
  controls: {
    alignItems: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 32,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  frameOverlay: {
    width: 311,
    height: 434,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 16,
    zIndex: 10,
  },
});
