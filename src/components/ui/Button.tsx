import React, { cloneElement, isValidElement } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme/useTheme';

export type ButtonVariant =
  | 'primary'
  | 'gradient'
  | 'reverseGradient'
  | 'secondary'
  | 'danger'
  | 'outline'
  | 'ghost'
  | 'scan';

type VariantConfig = {
  background: string;
  foreground: string;
  border: string;
  glow: string;
  style: object;
  gradient?: [string, string, ...string[]];
};

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
  leftIcon?: React.ReactElement<{ size?: number; color?: string }>;
  fullWidth?: boolean;
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
  fullWidth = false,
  ...rest
}) => {
  const theme = useTheme();

  const variantConfig: Record<ButtonVariant, VariantConfig> = {
    primary: {
      background: theme.colors.primary,
      foreground: theme.colors.primaryForeground,
      border: theme.colors.primary,
      glow: theme.colors.primary,
      style: {},
    },
    secondary: {
      background: theme.colors.background.secondary,
      foreground: theme.colors.primaryForeground,
      border: theme.colors.primary,
      glow: `${theme.colors.primary}22`,
      style: {
        elevation: 0,
        shadowColor: 'transparent',
      },
    },
    gradient: {
      background: theme.colors.primary,
      foreground: theme.colors.primaryForeground,
      gradient: [theme.colors.variants.primaryLight, theme.colors.primary],
      border: theme.colors.primary,
      glow: theme.colors.primary,
      style: {},
    },
    reverseGradient: {
      background: theme.colors.primary,
      foreground: theme.colors.primaryForeground,
      gradient: [theme.colors.primary, theme.colors.variants.primaryLight],
      border: theme.colors.primary,
      glow: theme.colors.primary,
      style: {},
    },
    danger: {
      background: theme.colors.danger,
      foreground: theme.colors.dangerForeground,
      border: theme.colors.danger,
      glow: theme.colors.danger,
      style: {},
    },
    outline: {
      background: 'transparent',
      foreground: theme.colors.primaryForeground,
      border: theme.colors.primary,
      glow: 'transparent',
      style: {
        elevation: 0,
        shadowColor: 'transparent',
      },
    },
    ghost: {
      background: 'transparent',
      foreground: theme.colors.primaryForeground,
      border: 'transparent',
      glow: 'transparent',
      style: {
        elevation: 0,
        shadowColor: 'transparent',
      },
    },
    scan: {
      background: theme.colors.background.tertiary,
      foreground: theme.colors.text.primary,
      gradient: [theme.colors.background.tertiary, theme.colors.background.secondary],
      border: theme.colors.border.light,
      glow: theme.colors.primary,
      style: {},
    },
  };

  const config = variantConfig[variant];

  const renderIcon = () => {
    if (!leftIcon || !isValidElement(leftIcon)) return null;
    // enforce a comfortable size and theme color for lucide icons
    return cloneElement(leftIcon, { color: config.foreground, size: leftIcon.props?.size ?? 18 });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      style={[
        styles.button,
        {
          borderRadius: theme.borderRadius.medium,
          borderWidth: config.border === 'transparent' ? 0 : 2,
          borderColor: config.border,
          backgroundColor:
            variant === 'outline' || variant === 'ghost' ? 'transparent' : config.background,
          shadowColor: config.glow,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: variant === 'outline' || variant === 'ghost' ? 0.02 : 0.18,
          shadowRadius: variant === 'outline' || variant === 'ghost' ? 6 : 18,
          elevation: variant === 'outline' || variant === 'ghost' ? 1 : 6,
          width: fullWidth ? '100%' : undefined,
        },
        (disabled || loading) && styles.disabledOpaque,
        buttonStyle,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      {/* gradient layer - only if needed */}
      {config.gradient && (
        <LinearGradient
          colors={config.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      )}

      {loading ? (
        <ActivityIndicator color={loadingColor || config.foreground} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon && (
            <View
              style={[
                styles.iconContainer,
                {
                  marginRight: 12,
                },
              ]}
            >
              {renderIcon()}
            </View>
          )}
          <Text
            style={[
              {
                color: config.foreground,
                fontSize: theme.typography.fontSizes.md,
                fontWeight: theme.typography.fontWeights.bold,
                textAlign: 'center',
                textShadowColor:
                  variant !== 'secondary' && config.glow !== 'transparent'
                    ? `${config.glow}33`
                    : 'transparent',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 6,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
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
    paddingHorizontal: 18,
    overflow: 'hidden',
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
  disabledOpaque: {
    opacity: 0.5,
  },
});

export default Button;
