import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, ViewStyle, StyleProp, DimensionValue } from 'react-native';

interface DetailCardProps {
  children: ReactNode;
  headerComponent?: ReactNode;
  style?: StyleProp<ViewStyle>;
  height?: DimensionValue;
}

export default function DetailCard({
  children,
  headerComponent,
  style,
  height = '60%',
}: DetailCardProps) {
  return (
    <View style={[styles.container, { height }, style]}>
      <View style={styles.headerBar}>
        <View style={styles.headerBarPill} />
      </View>

      {headerComponent && <View style={styles.fixedHeader}>{headerComponent}</View>}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    zIndex: 10,
    flexDirection: 'column',
  },
  headerBar: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerBarPill: {
    width: 40,
    height: 5,
    backgroundColor: '#d0d0d0',
    borderRadius: 3,
  },
  fixedHeader: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
});
