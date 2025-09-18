import React from 'react';
import { View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import GridBackground from '../../../components/ui/backgrounds/GridBackground';
import CardGlowEffect from './effects/CardGlowEffect';
import Animated from 'react-native-reanimated';
import { SCREEN_DIMENSIONS, CARD_ASPECT_RATIO } from '../../../constants';

interface CardImageSectionProps {
  imageUrl: string;
  cardAnimatedStyle?: object;
  onCardPress?: () => void;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const { WIDTH: SCREEN_WIDTH, HEIGHT: SCREEN_HEIGHT } = SCREEN_DIMENSIONS;

export default function CardImageSection({
  imageUrl,
  cardAnimatedStyle,
  onCardPress,
  accessible = true,
  accessibilityLabel = 'Card image',
  accessibilityHint = 'Double tap to view card details',
}: CardImageSectionProps) {
  const cardWidth = SCREEN_WIDTH * 0.58;
  const cardHeight = cardWidth / CARD_ASPECT_RATIO;

  return (
    <View style={styles.container}>
      <GridBackground lightTheme={true} density="low" />
      <CardGlowEffect imageUrl={imageUrl} intensity={0.6} scale={1.4} />

      <TouchableWithoutFeedback
        onPress={onCardPress}
        accessible={accessible}
        accessibilityRole="imagebutton"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        <Animated.View
          style={[
            styles.cardImageWrapper,
            {
              width: cardWidth,
              height: cardHeight,
              left: (SCREEN_WIDTH - cardWidth) / 2,
              top: SCREEN_HEIGHT / 2 - cardHeight * 1.27,
            },
            cardAnimatedStyle,
          ]}
        >
          <Image
            source={{ uri: imageUrl }}
            style={styles.cardImage}
            resizeMode="contain"
            accessible={accessible}
            accessibilityLabel={accessibilityLabel}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  cardImageWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
