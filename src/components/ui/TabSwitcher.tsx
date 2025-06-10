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
}: TabSwitcherProps<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.tab,
            index === 0 && styles.firstTab,
            index === options.length - 1 && styles.lastTab,
            tabStyle,
            activeTabId === option.id && styles.activeTab,
            activeTabId === option.id && activeTabStyle,
          ]}
          onPress={() => onTabChange(option.id)}
        >
          <Text
            style={[
              styles.tabText,
              textStyle,
              activeTabId === option.id && styles.activeTabText,
              activeTabId === option.id && activeTextStyle,
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
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    height: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 2,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
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
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '700',
  },
});
