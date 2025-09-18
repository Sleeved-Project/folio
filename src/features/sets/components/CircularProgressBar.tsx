import React from 'react';
import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

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
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Circular progress bar"
      accessibilityValue={{ min: 0, max: 100, now: progressPercent }}
    >
      <Svg width={size} height={size}>
        <Circle
          stroke={bgColor ? bgColor : '#f2f2f2'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />
        <Circle
          stroke={pgColor ? pgColor : '#3b5998'}
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
