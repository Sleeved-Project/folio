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

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.tertiary, borderColor: theme.colors.border.light },
        containerStyle
      ]}
      accessible
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.tab,
            index === 0 && styles.firstTab,
            index === options.length - 1 && styles.lastTab,
            { borderRightColor: theme.colors.border.light },
            tabStyle,
            activeTabId === option.id && [
              styles.activeTab,
              { backgroundColor: theme.colors.background.primary, ...theme.shadows.small },
              activeTabStyle,
            ],
          ]}
          onPress={() => onTabChange(option.id)}
          accessible
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTabId === option.id }}
          accessibilityLabel={option.label}
          accessibilityHint={activeTabId === option.id ? 'Selected tab' : 'Tap to select this tab'}
        >
          <Text
            style={[
              styles.tabText,
              { color: theme.colors.text.secondary },
              textStyle,
              activeTabId === option.id && [
                styles.activeTabText,
                { color: theme.colors.text.primary },
                activeTextStyle,
              ],
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 16,
    height: 40,
    borderWidth: 1,
    padding: 2,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRightWidth: 1,
  },
  firstTab: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  lastTab: {
    borderRightWidth: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  activeTab: {
    borderRadius: 6,
    borderWidth: 0,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: '700',
  },
});
