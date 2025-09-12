import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../../components/ui';
import { useTheme } from '../../../theme/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import BackButton from '../../../components/ui/BackButton';
import { useScanContext } from '../context/ScanContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  interpolate,
} from 'react-native-reanimated';

interface CardIdentifyResultProps {
  croppedImage: string;
  name: string;
  potentialMatchedCard?: string;
}

export default function CardIdentifyResult({
  croppedImage,
  name,
  potentialMatchedCard,
}: CardIdentifyResultProps) {
  const theme = useTheme();
  const { clearScanData } = useScanContext();

  const leftCardOpacity = useSharedValue(0);
  const rightCardOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);

  // Start animations
  useEffect(() => {
    // Title animation
    titleOpacity.value = withDelay(100, withTiming(1, { duration: 600 }));

    // Left card animation
    leftCardOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    // Right card animation - starts after left card
    rightCardOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));

    // Buttons animation (at the end)
    buttonsOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: interpolate(titleOpacity.value, [0, 1], [-10, 0]) }],
  }));

  const leftCardStyle = useAnimatedStyle(() => ({
    opacity: leftCardOpacity.value,
    transform: [
      {
        translateX: interpolate(leftCardOpacity.value, [0, 1], [-50, 0]),
      },
    ],
  }));

  const rightCardStyle = useAnimatedStyle(() => ({
    opacity: rightCardOpacity.value,
    transform: [
      {
        translateX: interpolate(rightCardOpacity.value, [0, 1], [50, 0]),
      },
    ],
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: interpolate(buttonsOpacity.value, [0, 1], [10, 0]) }],
  }));

  const handleConfirm = () => {
    // Tricks to go back directly to the original sell-form
    // since scan-identify now replaces scan in the stack
    setTimeout(() => {
      router.back();
      router.back();
    }, 0);
  };

  const handleRetry = () => {
    clearScanData();
    router.back();
  };

  return (
    <View style={styles.safeAreaView}>
      <LinearGradient
        colors={[
          theme.colors.primary,
          theme.colors.background.secondary,
          theme.colors.background.primary,
        ]}
        style={styles.container}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>

        {/* Card Name */}
        <Animated.Text style={[styles.cardName, { color: theme.colors.text.primary }, titleStyle]}>
          {name}
        </Animated.Text>

        {/* Cards Comparison - Side by Side */}
        <View style={styles.cardsContainer}>
          {/* Your Photo Card */}
          <Animated.View style={[styles.cardWrapper, leftCardStyle]}>
            <View style={[styles.cardImageContainer, { borderRadius: theme.borderRadius.medium }]}>
              <Image
                source={{ uri: croppedImage }}
                style={[styles.cardImage, { borderRadius: theme.borderRadius.medium }]}
                resizeMode="contain"
              />
            </View>

            <Text style={[styles.cardLabel, { color: theme.colors.text.secondary }]}>
              Your Photo
            </Text>
          </Animated.View>

          {/* Official Card */}
          <Animated.View style={[styles.cardWrapper, rightCardStyle]}>
            <View style={[styles.cardImageContainer, { borderRadius: theme.borderRadius.medium }]}>
              {potentialMatchedCard ? (
                <Image
                  source={{ uri: potentialMatchedCard }}
                  style={[styles.cardImage, { borderRadius: theme.borderRadius.medium }]}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={[
                    styles.cardImage,
                    styles.placeholder,
                    { borderRadius: theme.borderRadius.medium },
                  ]}
                >
                  <Text style={{ color: theme.colors.text.tertiary }}>No official image</Text>
                </View>
              )}
            </View>

            <Text style={[styles.cardLabel, { color: theme.colors.text.secondary }]}>
              Official Card
            </Text>
          </Animated.View>
        </View>

        {/* Action Buttons */}
        <Animated.View style={[styles.actionContainer, buttonsStyle]}>
          <Button
            title="This is my card"
            variant="primary"
            onPress={handleConfirm}
            buttonStyle={styles.confirmButton}
          />
          <Button
            title="Retry scan"
            variant="outline"
            onPress={handleRetry}
            buttonStyle={styles.retryButton}
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = Math.min(width * 0.42, 160);
const cardHeight = cardWidth * 1.4;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 10,
  },
  cardName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cardWrapper: {
    alignItems: 'center',
    padding: 8,
    maxWidth: cardWidth,
  },
  cardImageContainer: {
    width: cardWidth,
    height: cardHeight,
    position: 'relative',
    overflow: 'hidden',
    elevation: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    textAlign: 'center',
  },
  actionContainer: {
    width: '90%',
    gap: 14,
    marginTop: 20,
    paddingBottom: 10,
  },
  confirmButton: {
    height: 54,
  },
  retryButton: {
    height: 50,
  },
});
