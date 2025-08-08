import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const SCANLINE_HEIGHT = 3;

export default function ScanningAnimation() {
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const scanlineY = useSharedValue(0);
  const pulse = useSharedValue(1);

  // Lance l’anim seulement quand on connaît la hauteur réelle du conteneur
  useEffect(() => {
    if (!measuredHeight) return;
    const maxY = Math.max(0, measuredHeight - SCANLINE_HEIGHT);

    scanlineY.value = withRepeat(
      withTiming(maxY, { duration: 1600, easing: Easing.linear }),
      -1,
      true
    );

    pulse.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 800, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.in(Easing.ease) })
      ),
      -1,
      true
    );
  }, [measuredHeight]);

  const scanlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanlineY.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  return (
    <View style={styles.container} onLayout={(e) => setMeasuredHeight(e.nativeEvent.layout.height)}>
      {/* Overlay gradient subtil (modern) */}
      <Animated.View style={[styles.gradientOverlay, pulseStyle]}>
        <LinearGradient
          colors={['rgba(2,0,36,0.25)', 'rgba(9,9,121,0.25)', 'rgba(0,212,255,0.25)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>

      {/* Scanline (gradient horizontal + glow) */}
      <Animated.View style={[styles.scanlineContainer, scanlineStyle]}>
        <LinearGradient
          colors={['rgba(0,212,255,0)', 'rgba(0,212,255,0.95)', 'rgba(0,212,255,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.scanline}
        />
      </Animated.View>

      <Text style={styles.title}>Analyzing card…</Text>
      <Text style={styles.subtitle}>Detecting edges and patterns</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    // backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  scanlineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: SCANLINE_HEIGHT,
  },
  scanline: {
    width: '100%',
    height: SCANLINE_HEIGHT,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    position: 'absolute',
    bottom: 56,
    color: '#F8F8F8',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  subtitle: {
    position: 'absolute',
    bottom: 36,
    color: 'rgba(248,248,248,0.8)',
    fontSize: 13,
  },
});
