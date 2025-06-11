import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import GridBackground from '../../../components/ui/backgrounds/GridBackground';
import CardGlowEffect from './effects/CardGlowEffect';

interface CardImageSectionProps {
  imageUrl: string;
}

export default function CardImageSection({ imageUrl }: CardImageSectionProps) {
  return (
    <View style={styles.container}>
      <GridBackground lightTheme={true} density="low" />
      <CardGlowEffect imageUrl={imageUrl} intensity={0.6} scale={1.4} />

      <View style={styles.cardImageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cardImageWrapper: {
    width: '65%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
});
