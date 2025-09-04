import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_W } = Dimensions.get('window');
const SCANLINE_HEIGHT = 3;

export default function ScanningAnimation() {
  const [measuredHeight, setMeasuredHeight] = useState(0);

  // core animated values
  const scanA = useSharedValue(0);
  const scanB = useSharedValue(1);
  const shimmerX = useSharedValue(-1); // -1..1 sweeping
  const pulse = useSharedValue(1);
  const flicker = useSharedValue(0); // small occasional flicker

  // start continuous animations once we know the container height
  useEffect(() => {
    if (!measuredHeight) return;
    const maxY = Math.max(0, measuredHeight - SCANLINE_HEIGHT);

    // layered opposing scanlines for depth
    scanA.value = withRepeat(withTiming(maxY, { duration: 1400, easing: Easing.linear }), -1, true);
    scanB.value = withRepeat(withTiming(0, { duration: 1600, easing: Easing.linear }), -1, true);

    // shimmer sweeper: sweep then jump back
    shimmerX.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 900, easing: Easing.out(Easing.quad) }),
        withDelay(160, withTiming(-1.2, { duration: 1 }))
      ),
      -1,
      false
    );

    // breathing vignette
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 900, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 900, easing: Easing.in(Easing.ease) })
      ),
      -1,
      true
    );

    // subtle random flicker (kick flicker value every 1.8s)
    flicker.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 120 }),
        withDelay(1600, withTiming(0, { duration: 1 }))
      ),
      -1,
      false
    );
  }, [measuredHeight]);

  // animated styles
  const scanAStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanA.value }],
    opacity: interpolate(scanA.value, [0, measuredHeight / 2, measuredHeight], [0.18, 1, 0.18]),
  }));

  const scanBStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanB.value }],
    opacity: interpolate(scanB.value, [0, measuredHeight / 2, measuredHeight], [0.18, 1, 0.18]),
  }));

  const shimmerStyle = useAnimatedStyle(() => {
    const tx = interpolate(shimmerX.value, [-1.2, 1.2], [-SCREEN_W, SCREEN_W], Extrapolate.CLAMP);
    const op = interpolate(shimmerX.value, [-1.2, 0, 1.2], [0, 0.85, 0]);
    return {
      transform: [{ translateX: tx }],
      opacity: op,
    };
  });

  const vignetteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.04], [0.92, 1]),
  }));

  return (
    <View
      style={styles.container}
      onLayout={(e) => setMeasuredHeight(e.nativeEvent.layout.height)}
      accessible
      accessibilityLabel="Scanning animation"
    >
      {/* breathing vignette */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.vignette, vignetteStyle]} />

      {/* shimmer sweep */}
      <Animated.View pointerEvents="none" style={[styles.shimmerWrapper, shimmerStyle]}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.16)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.shimmer}
        />
      </Animated.View>

      {/* layered scanlines */}
      <Animated.View style={[styles.scanlineContainer, scanAStyle]}>
        <LinearGradient
          colors={['rgba(0,210,255,0)', 'rgba(0,210,255,0.96)', 'rgba(0,210,255,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.scanlineGlow}
        />
      </Animated.View>

      <Animated.View style={[styles.scanlineContainer, scanBStyle]}>
        <LinearGradient
          colors={['rgba(0,120,255,0)', 'rgba(0,120,255,0.9)', 'rgba(0,120,255,0)']}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={[styles.scanlineGlow, { height: SCANLINE_HEIGHT }]}
        />
      </Animated.View>

      {/* static global text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Scanning — please wait</Text>
        <Text style={styles.subtitle}>Analyzing surface. This won’t take long.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(3,8,28,0.5)',
  },
  vignette: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    shadowColor: '#00d4ff',
    shadowRadius: 36,
    shadowOpacity: 0.06,
  },
  shimmerWrapper: {
    position: 'absolute',
    left: -SCREEN_W,
    right: -SCREEN_W,
    top: 0,
    bottom: 0,
  },
  shimmer: {
    flex: 1,
    opacity: 0.9,
  },
  scanlineContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SCANLINE_HEIGHT,
    overflow: 'hidden',
  },
  scanlineGlow: {
    width: '120%',
    height: SCANLINE_HEIGHT,
    alignSelf: 'center',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.96,
    shadowRadius: 14,
    elevation: 6,
  },
  textContainer: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  title: {
    color: '#E8F9FF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(232,249,255,0.82)',
    fontSize: 13,
  },
});
