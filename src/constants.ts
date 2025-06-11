import { Dimensions } from 'react-native';

export const TOKEN_KEY = 'auth_token';

// Get screen dimensions
export const SCREEN_DIMENSIONS = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
};

// Card aspect ratio (standard Pokémon card is 2.5:3.5)
export const CARD_ASPECT_RATIO = 2.5 / 3.5;

// Drawer constants
export const DRAWER_DIMENSIONS = {
  EXPANDED_HEIGHT: SCREEN_DIMENSIONS.HEIGHT * 0.5, // 50% of screen
  COLLAPSED_HEIGHT: 70, // Minimal height when collapsed
};

// Animation constants
export const ANIMATION_CONFIG = {
  DURATION: 300,
  VELOCITY_THRESHOLD: 500,
};
