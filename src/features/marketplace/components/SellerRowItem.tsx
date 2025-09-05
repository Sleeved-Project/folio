import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { SellerItem } from '../types';

interface SellerRowItemProps {
  item: SellerItem;
  onPress?: () => void;
}

export function SellerRowItem({ item, onPress }: SellerRowItemProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      {item.avatarUrl ? (
        <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, { backgroundColor: theme.colors.background.tertiary }]} />
      )}
      <Text style={[styles.name, { color: theme.colors.text.primary }]}>{item.username}</Text>
      <Text style={[styles.chevron, { color: theme.colors.text.secondary }]}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  name: { flex: 1, fontSize: 16, fontWeight: '600' },
  chevron: { fontSize: 22, opacity: 0.3 },
});
