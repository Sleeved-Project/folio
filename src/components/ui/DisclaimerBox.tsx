import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface DisclaimerBoxProps {
  text: string;
  icon?: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function DisclaimerBox({
  text,
  type = 'info',
  icon,
  containerStyle,
  textStyle,
}: DisclaimerBoxProps) {
  const colors = {
    info: '#ddd',
    warning: '#f0ad4e',
    success: '#5cb85c',
  };

  return (
    <View style={[styles.container, { borderLeftColor: colors[type] }, containerStyle]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderLeftWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    flex: 1,
  },
});
