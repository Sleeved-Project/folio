import { TextStyle } from 'react-native';

export const theme = {
  colors: {
    primary: '#FDD21C',
    primaryForeground: '#3C2F00',
    secondary: '#3A3226',
    secondaryForeground: '#FFE48F',
    danger: '#E11D48',
    dangerForeground: '#FFFFFF',
    success: '#16A34A',
    successForeground: '#FFFFFF',
    info: '#7fb7b4',
    infoForeground: '#FFFFFF',
    warning: '#F59E0B',
    warningForeground: '#18181B',
    yellow: '#FDD21C',
    variants: {
      transparent: 'transparent',
      primaryLight: '#FFE48F',
      primaryAlpha10: 'rgba(253, 210, 28, 0.1)',
    },

    background: {
      primary: '#F0EFEA',
      secondary: '#FAFAFA',
      tertiary: '#FAFAFA',
    },
    text: {
      primary: '#18181B',
      secondary: '#52525B',
      tertiary: '#71717A',
      black: '#000000',
      onPrimary: '#fff',
    },
    border: {
      light: '#E4E4E7',
      medium: '#D4D4D8',
      dark: '#A1A1AA',
      black: '#000000',
    },
    states: {
      focus: '#F0F9FF',
      disabled: 'rgba(0, 0, 0, 0.5)',
      hover: '#F5F5F5',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    small: 6,
    medium: 8,
    large: 12,
    round: 50,
  },

  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    fontWeights: {
      regular: '400' as TextStyle['fontWeight'],
      medium: '500' as TextStyle['fontWeight'],
      semiBold: '600' as TextStyle['fontWeight'],
      bold: '700' as TextStyle['fontWeight'],
    },
  },

  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 4,
    },
  },
};

export type Theme = typeof theme;
