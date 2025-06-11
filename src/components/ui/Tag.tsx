import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tagText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
});
