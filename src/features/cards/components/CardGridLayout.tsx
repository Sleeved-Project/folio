import React from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';

interface CardGridLayoutProps {
  numColumns?: number;
  gap?: number;
  itemCount: number;
  renderItem: (params: { index: number; width: number; height: number }) => React.ReactNode;
  style?: object;
}

export default function CardGridLayout({
  numColumns = 2,
  gap = 8,
  itemCount,
  renderItem,
  style,
}: CardGridLayoutProps) {
  const width = useWindowDimensions().width - 32;
  const CARD_WIDTH = (width - gap * (numColumns + 1)) / numColumns;
  const CARD_HEIGHT = CARD_WIDTH * 1.36;

  return (
    <View style={[styles.grid, style]} accessibilityRole="list">
      {Array.from({ length: itemCount }).map((_, i) => (
        <View
          key={i}
          style={{
            width: CARD_WIDTH,
            marginHorizontal: gap / 2,
            marginBottom: gap * 2,
          }}
          accessibilityRole="adjustable"
          accessibilityLabel={`Card ${i + 1} of ${itemCount}`}
        >
          {renderItem({ index: i, width: CARD_WIDTH, height: CARD_HEIGHT })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
