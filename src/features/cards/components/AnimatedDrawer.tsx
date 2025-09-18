import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { PanGestureHandler, GestureEvent } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandlerEventPayload } from 'react-native-screens';
import { useTheme } from '../../../theme/useTheme';

type GestureHandlerType = (event: GestureEvent<PanGestureHandlerEventPayload>) => void;

interface AnimatedDrawerProps {
  children: ReactNode;
  headerComponent?: ReactNode;
  gestureHandler: GestureHandlerType;
  animatedStyle: object;
  onDragHandlePress?: () => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showDragHandle?: boolean;
  dragHandleColor?: string;
}

export default function AnimatedDrawer({
  children,
  headerComponent,
  gestureHandler,
  animatedStyle,
  onDragHandlePress,
  style,
  contentContainerStyle,
  showDragHandle = true,
  dragHandleColor,
}: AnimatedDrawerProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const handleColor = dragHandleColor || theme.colors.border.medium;

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background.primary,
            borderTopLeftRadius: theme.borderRadius.large * 2,
            borderTopRightRadius: theme.borderRadius.large * 2,
            ...theme.shadows.medium,
          },
          animatedStyle,
          style,
        ]}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Drawer. Swipe up or down to adjust."
      >
        {showDragHandle && (
          <View
            style={styles.dragHandleContainer}
            onTouchStart={Platform.OS === 'web' ? onDragHandlePress : undefined}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Drag handle. Swipe up or down to open or close drawer."
          >
            <View style={[styles.dragHandle, { backgroundColor: handleColor }]} />
          </View>
        )}

        {headerComponent && <View style={styles.headerContainer}>{headerComponent}</View>}

        <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>

        {insets.bottom > 0 && <View style={{ height: insets.bottom }} />}
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  dragHandleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dragHandle: {
    width: 60,
    height: 5,
    borderRadius: 3,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
