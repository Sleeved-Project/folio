import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'scan';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  loadingColor,
  leftIcon,
  ...rest
}) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: theme.colors.secondary };
      case 'danger':
        return { backgroundColor: theme.colors.danger };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
          shadowColor: 'transparent',
          elevation: 0,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          shadowColor: 'transparent',
          elevation: 0,
        };
      case 'scan':
        return { backgroundColor: theme.colors.background.tertiary };
      case 'primary':
      default:
        return { backgroundColor: theme.colors.primary };
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return { color: theme.colors.primary };
      case 'scan':
        return { color: theme.colors.text.primary };
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        return { color: 'white' };
    }
  };

  const getLoadingColor = () => {
    if (loadingColor) return loadingColor;

    switch (variant) {
      case 'outline':
      case 'ghost':
        return theme.colors.primary;
      case 'scan':
        return theme.colors.text.primary;
      default:
        return 'white';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
        (disabled || loading) && styles.disabledOpaque,
        buttonStyle,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={getLoadingColor()} size="small" />
      ) : (
        <View style={[styles.content]}>
          {leftIcon && (
            <View style={[styles.iconContainer, { marginRight: theme.spacing.md }]}>
              {leftIcon}
            </View>
          )}
          <Text style={[styles.text, getTextStyles(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  disabledOpaque: {
    opacity: 0.5,
  },
});

export default Button;
