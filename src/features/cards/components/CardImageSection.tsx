import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface CardImageSectionProps {
  imageUrl: string;
}

export default function CardImageSection({ imageUrl }: CardImageSectionProps) {
  return (
    <View style={styles.container}>
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
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImageWrapper: {
    width: '65%',
    height: '90%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
