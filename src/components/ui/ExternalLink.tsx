import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react-native';

interface ExternalLinkProps {
  url: string;
  label?: string;
  onPress?: (url: string) => void;
  color?: string;
}

export default function ExternalLink({
  url,
  label = 'View',
  onPress,
  color = '#2196F3',
}: ExternalLinkProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(url);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <ExternalLinkIcon size={16} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
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
