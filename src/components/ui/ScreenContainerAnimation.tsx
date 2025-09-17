import React, { useRef, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Animated, View, Text, useWindowDimensions } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import TitleScreen from './TitleScreen';

export default function ScreenContainerAnimation({
  children,
  title,
  showTitleSection = true,
}: {
  children: React.ReactNode;
  title?: string;
  showTitleSection?: boolean;
}) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();

  const scrollY = useRef(new Animated.Value(0)).current;
  const [titleHeight, setTitleHeight] = useState(56);

  const handleTitleLayout = (h: number) => setTitleHeight(h);

  // responsive header height
  const preferred = insets.top + 56;
  const maxByScreen = insets.top + Math.round(windowHeight * 0.08);
  const headerHeight = Math.max(
    insets.top + 44,
    Math.min(preferred, Math.max(preferred, maxByScreen, insets.top + 72))
  );

  // trigger for compact header appearance
  const baseTrigger = Math.max(0, titleHeight - insets.top);
  const appearanceDelay = 36;
  const triggerStart = baseTrigger + appearanceDelay;
  const animationRange = 28;

  const showHeaderProgress = scrollY.interpolate({
    inputRange: [triggerStart, triggerStart + animationRange],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTranslateY = showHeaderProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 0],
  });

  // Only reserve large-title space when a title / title section is shown.
  const contentPaddingTop =
    title && showTitleSection ? titleHeight + theme.spacing.sm : insets.top + theme.spacing.md;

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[
        styles.safe,
        {
          backgroundColor: theme.colors.background.primary,
        },
      ]}
    >
      {/* Render compact animated header only when there is a title to show */}
      {title && showTitleSection ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.fixedHeader,
            {
              top: 0,
              paddingTop: insets.top,
              height: headerHeight,
              paddingHorizontal: theme.spacing.md,
              backgroundColor: theme.colors.background.secondary,
              transform: [{ translateY: headerTranslateY }],
              opacity: showHeaderProgress,
              borderBottomColor: theme.colors.border.light,
              shadowColor: theme.shadows.small.shadowColor,
              shadowOffset: theme.shadows.small.shadowOffset,
              shadowOpacity: showHeaderProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, theme.shadows.small.shadowOpacity],
              }),
              shadowRadius: theme.shadows.small.shadowRadius,
              elevation: showHeaderProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, theme.shadows.small.elevation],
              }),
              justifyContent: 'center',
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={{
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.bold,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        </Animated.View>
      ) : null}

      <Animated.ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: contentPaddingTop,
            paddingHorizontal: theme.spacing.md,
          },
        ]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        {title && showTitleSection && (
          <View
            onLayout={(e) => handleTitleLayout(e.nativeEvent.layout.height)}
            style={{ zIndex: 1 }}
          >
            <TitleScreen title={title} />
          </View>
        )}

        <View>{children}</View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  fixedHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
    borderBottomWidth: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
