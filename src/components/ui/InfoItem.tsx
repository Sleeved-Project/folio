import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

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
  const theme = useTheme();

  if (value === null || value === undefined) return null;

  return (
    <View
      style={[
        styles.container,
        fullWidth ? styles.fullWidth : styles.halfWidth,
        {
          backgroundColor: theme.colors.background.tertiary,
          borderRadius: theme.borderRadius.medium,
        },
        accentBorder && {
          borderWidth: 1,
          borderColor: theme.colors.border.medium,
          backgroundColor: theme.colors.background.primary,
        },
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View style={styles.content}>
        <Text style={[styles.label, { color: theme.colors.text.tertiary }]}>{label}</Text>
        <Text
          style={[styles.value, { color: theme.colors.text.primary }]}
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
  },
  halfWidth: {
    width: '48%',
  },
  fullWidth: {
    width: '98%',
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
  },
});
