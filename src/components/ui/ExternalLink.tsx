import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

interface ExternalLinkProps {
  url: string;
  label?: string;
  onPress?: (url: string) => void;
  color?: string;
  accessibilityLabel?: string;
}

export default function ExternalLink({ url, label = 'View', onPress, color, accessibilityLabel }: ExternalLinkProps) {
  const theme = useTheme();
  const linkColor = color || theme.colors.primaryForeground;

  const handlePress = () => {
    if (onPress) {
      onPress(url);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      accessible
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel || label}
    >
      <ExternalLinkIcon size={16} color={linkColor} />
      <Text style={[styles.label, { color: linkColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginLeft: 4,
  },
});
