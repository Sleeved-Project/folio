import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';

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
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
        },
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.image,
          {
            opacity: intensity,
          },
        ]}
        resizeMode="cover"
        blurRadius={25}
      />
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: `rgba(${theme.colors.background.primary === '#FFFFFF' ? '255, 255, 255' : '0, 0, 0'}, 0.1)`,
          },
        ]}
      />
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
  },
});
