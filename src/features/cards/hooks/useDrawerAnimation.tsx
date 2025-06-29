import { useState } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { SCREEN_DIMENSIONS, DRAWER_DIMENSIONS, ANIMATION_CONFIG } from '../../../constants';

interface GestureContext {
  startY: number;
  [key: string]: unknown;
}

// Destructure constants for easier access
const {
  EXPANDED_HEIGHT,
  COLLAPSED_HEIGHT,
  FILTER_VIEW_COLLAPSED_HEIGHT,
  FILTER_VIEW_EXPANDED_HEIGHT,
} = DRAWER_DIMENSIONS;
const { DURATION, VELOCITY_THRESHOLD } = ANIMATION_CONFIG;
const { HEIGHT: SCREEN_HEIGHT } = SCREEN_DIMENSIONS;

export const useDrawerAnimation = ({ isFilterView }: { isFilterView?: boolean }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const expandedHeight = isFilterView ? FILTER_VIEW_EXPANDED_HEIGHT : EXPANDED_HEIGHT;
  const collapsedHeight = isFilterView ? FILTER_VIEW_COLLAPSED_HEIGHT : COLLAPSED_HEIGHT;
  // Animation values
  const drawerTranslateY = useSharedValue(0);

  // Toggle drawer function
  const toggleDrawer = () => {
    const newIsCollapsed = !isCollapsed;
    setIsCollapsed(newIsCollapsed);

    const targetValue = newIsCollapsed ? expandedHeight - collapsedHeight : 0;

    drawerTranslateY.value = withTiming(targetValue, {
      duration: DURATION,
      easing: Easing.out(Easing.cubic),
    });
  };

  // Gesture handler for drawer dragging
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startY = drawerTranslateY.value;
    },
    onActive: (event, ctx) => {
      // Calculate new position, but limit to prevent dragging too far
      const newPosition = ctx.startY + event.translationY;

      // Don't let drawer go above its expanded position or below collapsed position
      drawerTranslateY.value = Math.max(0, Math.min(newPosition, expandedHeight - collapsedHeight));
    },
    onEnd: (event) => {
      // Determine threshold for snapping
      const snapThreshold = (expandedHeight - collapsedHeight) / 2;

      // Determine if we should snap to expanded or collapsed state
      if (event.velocityY > VELOCITY_THRESHOLD || drawerTranslateY.value > snapThreshold) {
        // Collapse drawer
        drawerTranslateY.value = withTiming(expandedHeight - collapsedHeight, {
          duration: DURATION,
          easing: Easing.out(Easing.cubic),
        });
        runOnJS(setIsCollapsed)(true);
      } else {
        // Expand drawer
        drawerTranslateY.value = withTiming(0, {
          duration: DURATION,
          easing: Easing.out(Easing.cubic),
        });
        runOnJS(setIsCollapsed)(false);
      }
    },
  });

  // Animated styles for the drawer
  const drawerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: drawerTranslateY.value }],
      height: expandedHeight,
    };
  });

  // Animated styles for card image with adaptive centering
  const cardImageAnimatedStyle = useAnimatedStyle(() => {
    // Calculate progress (0 = expanded, 1 = collapsed)
    const progress = drawerTranslateY.value / (expandedHeight - collapsedHeight);

    // Adaptive scale based on screen size
    const cardScale = interpolate(
      progress,
      [0, 1],
      [1, 1.4], // Scale from 1x to 1.4x when collapsed
      Extrapolate.CLAMP
    );

    // Calculate vertical offset to properly center the card when collapsed
    // This ensures the card is centered on any screen size when drawer is collapsed
    const centeringOffset = SCREEN_HEIGHT * 0.11 * progress;

    return {
      transform: [{ scale: cardScale }, { translateY: centeringOffset }],
    };
  });

  return {
    isCollapsed,
    toggleDrawer,
    gestureHandler,
    drawerAnimatedStyle,
    cardImageAnimatedStyle,
    constants: {
      DRAWER_EXPANDED_HEIGHT: EXPANDED_HEIGHT,
      DRAWER_COLLAPSED_HEIGHT: COLLAPSED_HEIGHT,
    },
  };
};
