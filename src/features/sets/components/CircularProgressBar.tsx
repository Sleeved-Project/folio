import React from 'react';
import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { useTheme } from '../../../theme/useTheme';

interface CircularProgressBarProps {
  size: number;
  strokeWidth: number;
  progressPercent: number;
  bgColor?: string;
  pgColor?: string;
}

const CircularProgressBar = ({
  size,
  strokeWidth,
  progressPercent,
  bgColor,
  pgColor,
}: CircularProgressBarProps) => {
  const theme = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;

  return (
    <View>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={bgColor ? bgColor : theme.colors.primaryForeground}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />

        {/* Progress Circle */}
        <Circle
          stroke={pgColor ? pgColor : theme.colors.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
