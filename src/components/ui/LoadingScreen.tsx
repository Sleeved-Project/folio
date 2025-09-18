import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import appIcon from '../../../assets/logo.png';
import { useTheme } from '../../theme/useTheme';

interface LoadingScreenProps {
  showLogo?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ showLogo = true }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {showLogo && <Image source={appIcon} style={styles.logo} />}
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.spinner} />
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
});
