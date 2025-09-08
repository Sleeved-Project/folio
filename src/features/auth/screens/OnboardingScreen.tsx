import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  FadeIn,
  SlideInRight,
  ZoomIn,
} from 'react-native-reanimated';
import { theme } from '../../../theme/theme';
import { Button } from '../../../components/ui';
import logoImage from '../../../../assets/logo.png';
import { Ionicons } from '@expo/vector-icons';

// Images d'exemple - remplacer par les vraies assets
const CHARIZARD_CARD = { uri: 'https://images.pokemontcg.io/base1/4_hires.png' };
const PIKACHU_CARD = { uri: 'https://images.pokemontcg.io/swsh4/25_hires.png' };
const BLASTOISE_CARD = { uri: 'https://images.pokemontcg.io/base1/2_hires.png' };

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.45; // Carte plus petite (45% au lieu de 60%)
const CARD_HEIGHT = CARD_WIDTH * 1.4;
const ANIMATION_STATE_DURATION = 3000;

// États de l'animation
const STATES = {
  SCAN: 0,
  PRICE: 1,
  COLLECTION: 2,
  SELL: 3,
};

export default function OnboardingScreen() {
  const router = useRouter();
  const [animationState, setAnimationState] = useState(STATES.SCAN);
  const [scanAnimationActive, setScanAnimationActive] = useState(true);
  const logoScale = useSharedValue(1);
  const scanLinePosition = useSharedValue(-CARD_HEIGHT);
  const cardRotate = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const priceScale = useSharedValue(0.8);
  const priceOpacity = useSharedValue(0);
  const sellOverlayOpacity = useSharedValue(0);

  // Animation pour le logo
  useEffect(() => {
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // Animation de scan
  useEffect(() => {
    if (animationState === STATES.SCAN && scanAnimationActive) {
      // Réinitialiser la position de la ligne de scan
      scanLinePosition.value = -10;

      // Démarrer l'animation de scan
      scanLinePosition.value = withTiming(CARD_HEIGHT, {
        duration: 1800,
        easing: Easing.inOut(Easing.cubic),
      });
    }
  }, [animationState, scanAnimationActive]);

  // Cycle des animations d'onboarding
  useEffect(() => {
    const runAnimationCycle = () => {
      // État 1: Animation de scan
      if (animationState === STATES.SCAN) {
        // Reset
        setScanAnimationActive(true); // Activer l'animation de scan
        cardRotate.value = withTiming(0, { duration: 400 });
        cardScale.value = withTiming(1, { duration: 400 });
        priceOpacity.value = 0;
        sellOverlayOpacity.value = withTiming(0, { duration: 300 });

        // Après le scan, passer à l'état suivant
        setTimeout(() => setAnimationState(STATES.PRICE), ANIMATION_STATE_DURATION);
      }

      // État 2: Affichage du prix
      else if (animationState === STATES.PRICE) {
        setScanAnimationActive(false); // Désactiver l'animation de scan
        cardRotate.value = withTiming(5, { duration: 400 });
        priceOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
        priceScale.value = withDelay(
          300,
          withTiming(1, { duration: 800, easing: Easing.out(Easing.back()) })
        );

        setTimeout(() => setAnimationState(STATES.COLLECTION), ANIMATION_STATE_DURATION);
      }

      // État 3: Intégration dans la collection
      else if (animationState === STATES.COLLECTION) {
        priceOpacity.value = withTiming(0, { duration: 300 });
        cardScale.value = withTiming(0.6, { duration: 800 });
        cardRotate.value = withTiming(-10, { duration: 500 });

        setTimeout(() => setAnimationState(STATES.SELL), ANIMATION_STATE_DURATION);
      }

      // État 4: Vente - Préparer la transition vers SCAN
      else if (animationState === STATES.SELL) {
        // Faire une animation qui se rapproche de l'état initial
        cardRotate.value = withTiming(0, { duration: 800 });
        cardScale.value = withTiming(1, { duration: 600 });
        sellOverlayOpacity.value = withTiming(1, { duration: 300 });

        // Revenir au début du cycle, mais avec une animation qui ne crée pas de saut
        setTimeout(() => {
          // On efface progressivement l'overlay pour revenir à l'état SCAN
          sellOverlayOpacity.value = withTiming(0, {
            duration: 300,
            easing: Easing.inOut(Easing.ease),
          });

          setTimeout(() => {
            setAnimationState(STATES.SCAN);
          }, 300);
        }, ANIMATION_STATE_DURATION - 300); // On démarre la transition un peu avant
      }
    };

    runAnimationCycle();
  }, [animationState]);

  // Styles animés
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLinePosition.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }, { rotateZ: `${cardRotate.value}deg` }],
  }));

  const priceStyle = useAnimatedStyle(() => ({
    opacity: priceOpacity.value,
    transform: [{ scale: priceScale.value }],
  }));

  const sellOverlayStyle = useAnimatedStyle(() => ({
    opacity: sellOverlayOpacity.value,
  }));

  // Contenu conditionnel basé sur l'état de l'animation
  const renderAnimationContent = () => {
    switch (animationState) {
      case STATES.SCAN:
        return (
          <View style={styles.animationContainer}>
            <View style={styles.cardWrapper}>
              <Animated.View style={[styles.card, cardStyle]}>
                <Image source={CHARIZARD_CARD} style={styles.cardImage} />
                {scanAnimationActive && <Animated.View style={[styles.scanLine, scanLineStyle]} />}
              </Animated.View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.stepTitle}>Estimez</Text>
              <Text style={styles.stepDescription}>
                Scannez vos cartes et obtenez leur valeur instantanément
              </Text>
            </View>
          </View>
        );

      case STATES.PRICE:
        return (
          <View style={styles.animationContainer}>
            <View style={styles.cardWrapper}>
              <Animated.View style={[styles.card, cardStyle]}>
                <Image source={CHARIZARD_CARD} style={styles.cardImage} />
              </Animated.View>

              <Animated.View style={[styles.priceTag, priceStyle]}>
                <Text style={styles.priceValue}>352€</Text>
                <Text style={styles.priceTrend}>+12% ce mois-ci</Text>
              </Animated.View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.stepTitle}>Estimez</Text>
              <Text style={styles.stepDescription}>
                Scannez vos cartes et obtenez leur valeur instantanément
              </Text>
            </View>
          </View>
        );

      case STATES.COLLECTION:
        return (
          <View style={styles.animationContainer}>
            <View style={styles.cardWrapper}>
              <View style={styles.collectionGrid}>
                <Animated.View entering={ZoomIn.duration(500).delay(300)} style={styles.smallCard}>
                  <Image source={PIKACHU_CARD} style={styles.cardImage} />
                </Animated.View>

                <Animated.View style={[styles.card, cardStyle, styles.collectionMainCard]}>
                  <Image source={CHARIZARD_CARD} style={styles.cardImage} />
                </Animated.View>

                <Animated.View entering={ZoomIn.duration(500).delay(600)} style={styles.smallCard}>
                  <Image source={BLASTOISE_CARD} style={styles.cardImage} />
                </Animated.View>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.stepTitle}>Collectionnez</Text>
              <Text style={styles.stepDescription}>
                Organisez et suivez votre collection en temps réel
              </Text>
            </View>
          </View>
        );

      case STATES.SELL:
        return (
          <View style={styles.animationContainer}>
            <View style={styles.cardWrapper}>
              <Animated.View style={[styles.card, cardStyle]}>
                <Image source={CHARIZARD_CARD} style={styles.cardImage} />
                <Animated.View style={[styles.sellOverlay, sellOverlayStyle]}>
                  <Text style={styles.soldText}>VENDU</Text>
                </Animated.View>
              </Animated.View>

              {/* Prix de vente repositionné et avec un style amélioré */}
              <Animated.View
                entering={SlideInRight.duration(500).delay(300)}
                style={styles.moneyContainer}
              >
                <Ionicons name="cash-outline" size={38} color="#fff" />
                <Text style={styles.moneyText}>352€</Text>
              </Animated.View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.stepTitle}>Vendez</Text>
              <Text style={styles.stepDescription}>
                Trouvez des acheteurs et réalisez des transactions sécurisées
              </Text>
            </View>
          </View>
        );
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.innerContainer}>
          {/* Section Supérieure: Logo animé et titre */}
          <View style={styles.topSection}>
            <Animated.Image source={logoImage} style={[styles.logo, logoAnimatedStyle]} />
            <Text style={styles.title}>Sleeved</Text>
          </View>

          {/* Section Centrale: Animation dynamique */}
          {renderAnimationContent()}

          {/* Section Inférieure: Boutons d'action */}
          <View style={styles.bottomSection}>
            <Button
              title="S'inscrire sur Sleeved"
              onPress={() => router.push('/sign-up')}
              style={styles.button}
            />
            <Button
              variant="outline"
              title="J'ai déjà un compte"
              onPress={() => router.push('/sign-in')}
              style={styles.button}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'android' ? theme.spacing.xl : theme.spacing.lg,
  },
  topSection: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? theme.spacing.xl : theme.spacing.lg,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  tagline: {
    fontSize: 18,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  animationContainer: {
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    height: 220,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(52, 152, 219, 0.7)',
    zIndex: 1,
  },
  priceTag: {
    position: 'absolute',
    right: '20%',
    top: CARD_HEIGHT / 3,
    backgroundColor: '#3498db',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  priceTrend: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  collectionGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallCard: {
    width: CARD_WIDTH * 0.5,
    height: CARD_HEIGHT * 0.5,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: -20,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  collectionMainCard: {
    zIndex: 2,
  },
  sellOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soldText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    transform: [{ rotate: '-25deg' }],
    borderWidth: 3,
    borderColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  moneyContainer: {
    position: 'absolute',
    right: '15%',
    top: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    padding: theme.spacing.md,
    borderRadius: 20,
  },
  moneyText: {
    color: '#2ecc71',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: theme.spacing.sm,
  },
  textContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  stepDescription: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 22,
  },
  bottomSection: {
    width: '100%',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg, // Ajustement de l'espace après avoir supprimé les indicateurs
  },
  button: {
    minHeight: 52,
  },
});
