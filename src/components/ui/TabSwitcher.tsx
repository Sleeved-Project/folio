import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

export interface TabOption<T extends string> {
  id: T;
  label: string;
}

interface TabSwitcherProps<T extends string> {
  options: TabOption<T>[];
  activeTabId: T;
  onTabChange: (tabId: T) => void;
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function TabSwitcher<T extends string>({
  options,
  activeTabId,
  onTabChange,
  containerStyle,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle,
  accessibilityLabel,
  accessibilityHint,
}: TabSwitcherProps<T>) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.tertiary,
          borderColor: theme.colors.border.light,
        },
        containerStyle,
      ]}
      accessible
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {options.map((option, index) => {
        const isActive = option.id === activeTabId;

        return (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.tab,
              index === 0 && styles.firstTab,
              index === options.length - 1 && styles.lastTab,
              tabStyle,
              isActive && [
                styles.activeTab,
                {
                  backgroundColor: theme.colors.background.primary,
                  ...theme.shadows.small,
                },
                activeTabStyle,
              ],
              !isActive && {
                backgroundColor: theme.colors.background.tertiary,
                borderColor: theme.colors.border.light,
              },
            ]}
            onPress={() => onTabChange(option.id)}
            accessible
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={option.label}
            accessibilityHint={isActive ? 'Selected tab' : 'Tap to select this tab'}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: isActive
                    ? theme.colors.text.primary
                    : theme.colors.text.secondary,
                },
                textStyle,
                isActive && [
                  {
                    color: theme.colors.text.primary,
                  },
                  activeTextStyle,
                ],
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: theme.borderRadius.medium,
      marginBottom: theme.spacing.md,
      height: 40,
      borderWidth: 1,
      padding: 2,
      overflow: 'hidden',
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Math.max(6, theme.spacing.xs),
      borderRightWidth: 1,
      borderRightColor: theme.colors.border.light,
    },
    firstTab: {
      borderTopLeftRadius: theme.borderRadius.medium,
      borderBottomLeftRadius: theme.borderRadius.medium,
    },
    lastTab: {
      borderRightWidth: 0,
      borderTopRightRadius: theme.borderRadius.medium,
      borderBottomRightRadius: theme.borderRadius.medium,
    },
    activeTab: {
      borderWidth: 0,
      borderRadius: theme.borderRadius.medium,
      shadowColor: theme.shadows.small.shadowColor,
    },
    tabText: {
      fontSize: theme.typography.fontSizes.md,
      fontWeight: theme.typography.fontWeights.medium as TextStyle['fontWeight'],
    },
  });

export default TabSwitcher;
