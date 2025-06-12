import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { PanGestureHandler, GestureEvent } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandlerEventPayload } from 'react-native-screens';

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
  dragHandleColor = '#d0d0d0',
}: AnimatedDrawerProps) {
  const insets = useSafeAreaInsets();

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle, style]}>
        {/* Drag handle */}
        {showDragHandle && (
          <View
            style={styles.dragHandleContainer}
            onTouchStart={Platform.OS === 'web' ? onDragHandlePress : undefined}
          >
            <View style={[styles.dragHandle, { backgroundColor: dragHandleColor }]} />
          </View>
        )}

        {headerComponent && <View style={styles.headerContainer}>{headerComponent}</View>}

        <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>

        {insets.bottom > 0 && <View style={{ height: -insets.bottom }} />}
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
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
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
