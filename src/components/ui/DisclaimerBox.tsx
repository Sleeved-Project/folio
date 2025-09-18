import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';

interface DisclaimerBoxProps {
  text: string;
  icon?: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'text' | 'alert';
}

export default function DisclaimerBox({
  text,
  type = 'info',
  icon,
  containerStyle,
  textStyle,
  accessible,
  accessibilityLabel,
  accessibilityRole = 'text',
}: DisclaimerBoxProps) {
  const theme = useTheme();

  const getAccentColor = () => {
    switch (type) {
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      case 'info':
      default:
        return theme.colors.border.medium;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderLeftColor: getAccentColor(),
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.small,
        },
        containerStyle,
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, { color: theme.colors.text.tertiary }, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderLeftWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    fontStyle: 'italic',
    flex: 1,
  },
});
