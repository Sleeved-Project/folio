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
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'scan';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  loadingColor,
  ...rest
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return styles.buttonSecondary;
      case 'danger':
        return styles.buttonDanger;
      case 'outline':
        return styles.buttonOutline;
      case 'ghost':
        return styles.buttonGhost;
      case 'scan':
        return styles.buttonScan;
      case 'primary':
      default:
        return styles.buttonPrimary;
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
        return styles.textOutline;
      case 'ghost':
        return styles.textGhost;
      case 'primary':
      case 'secondary':
      case 'danger':
      default:
        return styles.textPrimary;
    }
  };

  const getDisabledStyles = () => {
    if (variant === 'outline' || variant === 'ghost') {
      return styles.disabledTransparent;
    }
    return styles.disabledOpaque;
  };

  const getLoadingColor = () => {
    if (loadingColor) return loadingColor;

    switch (variant) {
      case 'outline':
      case 'ghost':
        return '#2196F3';
      default:
        return 'white';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyles(),
        (disabled || loading) && getDisabledStyles(),
        buttonStyle,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={getLoadingColor()} size="small" />
      ) : (
        <Text style={[styles.text, getTextStyles(), textStyle]}>{title}</Text>
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
  buttonPrimary: {
    backgroundColor: '#2196F3',
  },
  buttonSecondary: {
    backgroundColor: '#757575',
  },
  buttonDanger: {
    backgroundColor: '#FF3B30',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
    shadowColor: 'transparent',
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonScan: {
    backgroundColor: '#EFF1F5',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  textPrimary: {
    color: 'white',
  },
  textOutline: {
    color: '#2196F3',
  },
  textGhost: {
    color: '#2196F3',
  },
  disabledOpaque: {
    opacity: 0.5,
  },
  disabledTransparent: {
    opacity: 0.5,
  },
});

export default Button;
