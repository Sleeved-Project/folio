import { TextStyle } from 'react-native';

export const theme = {
  colors: {
    primary: '#2196F3',
    secondary: '#757575',
    danger: '#FF3B30',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#f0ad4e',

    variants: {
      primaryLight: '#2196F31A',
    },

    background: {
      primary: '#FFFFFF',
      secondary: '#F8F8F8',
      tertiary: '#EFF1F5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      tertiary: '#A09CAB',
      black: '#000000',
      onPrimary: '#fff',
    },
    border: {
      light: '#E0E0E0',
      medium: '#D0D0D0',
      dark: '#BBBBBB',
      black: '#000000',
    },

    states: {
      focus: '#F0F9FF',
      disabled: 'rgba(0, 0, 0, 0.5)',
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
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
  },
};

export type Theme = typeof theme;
