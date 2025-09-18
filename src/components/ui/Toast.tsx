import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Animated, StyleSheet, Text, View, AccessibilityInfo } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { ToastOptions } from './ToasterProvider';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react-native';

interface ToastProps {
  toast: ToastOptions | null;
}

const ICONS = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
};

const getToastColor = (type: ToastOptions['type'], theme: ReturnType<typeof useTheme>) => {
  switch (type) {
    case 'error':
      return theme.colors.danger;
    case 'info':
      return theme.colors.info ?? theme.colors.primary;
    case 'success':
    default:
      return theme.colors.primary;
  }
};

export default function Toast({ toast }: ToastProps) {
  const theme = useTheme();
  const slideAnim = useRef(new Animated.Value(120)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [displayedToast, setDisplayedToast] = useState<ToastOptions | null>(null);

  const { Icon, bgColor } = useMemo(() => {
    const type = displayedToast?.type ?? 'success';
    return {
      Icon: ICONS[type] || CheckCircle,
      bgColor: getToastColor(type, theme),
    };
  }, [displayedToast, theme]);

  useEffect(() => {
    if (toast) {
      setDisplayedToast(toast);
      setVisible(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          speed: 18,
          bounciness: 4,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
      AccessibilityInfo.announceForAccessibility(toast.message);
    } else if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 50,
          useNativeDriver: true,
          speed: 18,
          bounciness: 0,
        }),
      ]).start(() => {
        setVisible(false);
        setDisplayedToast(null);
      });
    }
  }, [toast]);

  if (!visible || !displayedToast) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          borderRadius: theme.borderRadius.medium,
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
        theme.shadows.medium,
      ]}
      accessible
      accessibilityRole="alert"
      accessibilityLabel={displayedToast.message}
    >
      <View style={styles.iconWrapper}>
        <Icon color={theme.colors.text.onPrimary} size={18} />
      </View>
      <Text
        style={[styles.text, { color: theme.colors.text.onPrimary }]}
        numberOfLines={2}
      >
        {displayedToast.message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    zIndex: 9999,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 44,
  },
  iconWrapper: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
  text: {
    fontWeight: '500',
    fontSize: 13,
    flex: 1,
    textAlign: 'left',
    includeFontPadding: false,
  },
});
