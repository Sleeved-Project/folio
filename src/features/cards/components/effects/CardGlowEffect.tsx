import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

interface CardGlowEffectProps {
  imageUrl: string;
  intensity?: number;
  scale?: number;
}

export default function CardGlowEffect({
  imageUrl,
  intensity = 0.6,
  scale = 1.4,
}: CardGlowEffectProps) {
  return (
    <View style={[styles.container, { width: `${scale * 100}%`, height: `${scale * 100}%` }]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { opacity: intensity }]}
        resizeMode="cover"
        blurRadius={25}
      />
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
