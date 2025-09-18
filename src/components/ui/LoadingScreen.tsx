import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text, Platform } from 'react-native';
import appIcon from '../../../assets/logo.png';

interface LoadingScreenProps {
  showLogo?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ showLogo = true }) => {
  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel="Chargement en cours"
      {...(Platform.OS === 'android' ? { accessibilityLiveRegion: 'polite' } : {})}
    >
      {showLogo && (
        <Image
          source={appIcon}
          style={styles.logo}
          accessible
          accessibilityRole="image"
          accessibilityLabel="Logo de l'application"
        />
      )}
      <ActivityIndicator size="large" color="#000" style={styles.spinner} />
      <Text style={styles.hiddenText}>Chargement…</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  spinner: {
    marginTop: 20,
  },
  hiddenText: {
    position: 'absolute',
    height: 0,
    width: 0,
  },
});
