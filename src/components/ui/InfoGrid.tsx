import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface InfoGridProps {
  children: ReactNode;
}

export default function InfoGrid({ children }: InfoGridProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
