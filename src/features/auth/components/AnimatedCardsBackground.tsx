import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Liste réduite et soignée de cartes (URLs publiques pokemontcg.io).
 * Remplace / ajoute les images que tu veux ; gardez peu d'items pour la perf.
 */
const RARE_CARDS = [
  'https://images.pokemontcg.io/base1/4.png', // Charizard (base)
  'https://images.pokemontcg.io/base1/2.png', // Venusaur (base)
  'https://images.pokemontcg.io/base1/15.png', // Blastoise (base)
  'https://images.pokemontcg.io/gym2/16.png', // Mewtwo
];

const CARD_WIDTH = 110;
const CARD_HEIGHT = 155;
const CONTAINER_HEIGHT = 220;

export default function AnimatedCardsBackground() {
  const cards = RARE_CARDS.map((uri, i) => {
    const offsetX =
      SCREEN_WIDTH / 2 - CARD_WIDTH / 2 + (i - (RARE_CARDS.length - 1) / 2) * (CARD_WIDTH * 0.6);
    const tx = useSharedValue(offsetX);
    const ty = useSharedValue(8 + Math.random() * 12);
    const rotate = useSharedValue(Math.random() * 10 - 5);
    const scale = useSharedValue(0.92 + Math.random() * 0.16);
    const opacity = useSharedValue(0.35 + Math.random() * 0.25);

    return { uri, tx, ty, rotate, scale, opacity, delay: i * 250 };
  });

  useEffect(() => {
    cards.forEach((card) => {
      // animation fluide et répétée sans setTimeout
      const float = () => {
        const dur = 3000 + Math.random() * 2000;
        card.ty.value = withDelay(
          card.delay,
          withRepeat(
            withTiming(12 + Math.random() * 8, {
              duration: dur,
              easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
          )
        );
        card.rotate.value = withDelay(
          card.delay,
          withRepeat(
            withTiming(Math.random() * 6 - 3, { duration: dur, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
          )
        );
        card.scale.value = withDelay(
          card.delay,
          withRepeat(
            withTiming(0.94 + Math.random() * 0.12, {
              duration: dur,
              easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
          )
        );
        card.opacity.value = withDelay(
          card.delay,
          withRepeat(
            withTiming(0.28 + Math.random() * 0.25, {
              duration: dur,
              easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
          )
        );
      };

      float();
    });
  }, []);

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <LinearGradient
        colors={['rgba(12,10,30,0.0)', 'rgba(8,6,20,0.55)']}
        style={styles.gradient}
      />
      <View style={styles.container}>
        {cards.map((card, idx) => {
          const animated = useAnimatedStyle(() => ({
            transform: [
              { translateX: card.tx.value },
              { translateY: card.ty.value },
              { rotate: `${card.rotate.value}deg` },
              { scale: card.scale.value },
            ],
            opacity: card.opacity.value,
          }));

          return (
            <Animated.View key={idx} style={[styles.cardWrapper, animated]}>
              <Image source={{ uri: card.uri }} style={styles.cardImage} />
            </Animated.View>
          );
        })}
      </View>

      {/* léger overlay pour assurer lisibilité du contenu */}
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    zIndex: -1, // derrière le contenu principal
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: '100%',
    height: CONTAINER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.02)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 60,
    bottom: 0,
    backgroundColor: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
  },
});
