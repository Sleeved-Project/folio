import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Line, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

interface GridBackgroundProps {
  lightTheme?: boolean;
  density?: 'low' | 'medium' | 'high';
}

export default function GridBackground({
  lightTheme = true,
  density = 'low',
}: GridBackgroundProps) {
  // Determine grid line count based on density
  const horizontalLines = density === 'low' ? 8 : density === 'medium' ? 12 : 16;
  const verticalLines = density === 'low' ? 10 : density === 'medium' ? 15 : 20;

  // Calculate spacing between lines
  const hSpacing = 40 / (density === 'low' ? 1 : density === 'medium' ? 1.5 : 2);
  const vSpacing = 40 / (density === 'low' ? 1 : density === 'medium' ? 1.5 : 2);

  // Colors based on theme
  const gradientColors = lightTheme ? ['#ffffff', '#f8f9fa'] : ['#1a1a2e', '#16213e'];

  const lineColor = lightTheme ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.07)';

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.svg}>
        <Defs>
          <LinearGradient id="backgroundGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={gradientColors[0]} stopOpacity="1" />
            <Stop offset="1" stopColor={gradientColors[1]} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Background rectangle with gradient */}
        <Rect width="100%" height="100%" fill="url(#backgroundGradient)" />

        {/* Horizontal grid lines */}
        {Array.from({ length: horizontalLines }, (_, i) => (
          <Line
            key={`h-${i}`}
            x1="0"
            y1={i * hSpacing}
            x2="100%"
            y2={i * hSpacing}
            stroke={lineColor}
            strokeWidth="1"
          />
        ))}

        {/* Vertical grid lines */}
        {Array.from({ length: verticalLines }, (_, i) => (
          <Line
            key={`v-${i}`}
            x1={i * vSpacing}
            y1="0"
            x2={i * vSpacing}
            y2="100%"
            stroke={lineColor}
            strokeWidth="1"
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
