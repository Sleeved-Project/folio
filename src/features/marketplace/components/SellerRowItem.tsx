import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProfilePicture from '../../user/components/profile/ProfilePicture';
import { Seller } from '../types';

interface SellerRowItemProps {
  item: Seller;
  onPress?: () => void;
}

export function SellerRowItem({ item, onPress }: SellerRowItemProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.7}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Seller ${item.username}`}
      accessibilityHint="Tap to view seller profile"
    >
      <ProfilePicture
        username={item.username}
        uri={item.avatarUrl}
        size="small"
        accessible /* Type '{ username: string; uri: string; size: "small"; accessible: true; accessibilityRole: string; accessibilityLabel: string; }' is not assignable to type 'IntrinsicAttributes & ProfilePictureProps'.
  Property 'accessible' does not exist on type 'IntrinsicAttributes & ProfilePictureProps'.ts(2322)
(property) accessible: true */
        accessibilityRole="image"
        accessibilityLabel={`${item.username}'s profile picture`}
      />
      <Text
        style={[styles.name, { color: theme.colors.text.primary, paddingLeft: 12 }]}
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Username: ${item.username}`}
      >
        {item.username}
      </Text>
      <Text
        style={[styles.chevron, { color: theme.colors.text.secondary }]}
        accessible
        accessibilityRole="text"
        accessibilityLabel="Chevron indicating navigation"
      >
        ›
      </Text>
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
