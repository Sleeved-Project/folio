import React from 'react';
import { Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

export default function TitleScreen({ title, style }: Props) {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.colors.primaryForeground,
          fontWeight: theme.typography.fontWeights.bold,
          fontSize: theme.typography.fontSizes.xxl,
          marginVertical: theme.spacing.md,
        },
        style,
      ]}
    >
      {title}
    </Text>
  );
}
