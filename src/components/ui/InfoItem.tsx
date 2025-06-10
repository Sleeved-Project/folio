import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoItemProps {
  label: string;
  value: string | number | null | undefined;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  accentBorder?: boolean;
  useEllipsis?: boolean;
  numberOfLines?: number;
}

export default function InfoItem({
  label,
  value,
  icon,
  fullWidth = false,
  accentBorder = false,
  useEllipsis = true,
  numberOfLines = 1,
}: InfoItemProps) {
  if (value === null || value === undefined) return null;

  return (
    <View
      style={[
        styles.container,
        fullWidth ? styles.fullWidth : styles.halfWidth,
        accentBorder && styles.accentBorder,
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text
          style={styles.value}
          numberOfLines={useEllipsis ? numberOfLines : undefined}
          ellipsizeMode="tail"
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  halfWidth: {
    width: '48%',
    marginHorizontal: '1%',
  },
  fullWidth: {
    width: '98%',
    marginHorizontal: '1%',
  },
  accentBorder: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
});
