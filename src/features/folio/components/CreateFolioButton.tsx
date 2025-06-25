import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { FolderPlus } from 'lucide-react-native';

interface CreateFolioButtonProps {
  onPress: () => void;
}

export default function CreateFolioButton({ onPress }: CreateFolioButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
          borderWidth: 2,
          borderColor: theme.colors.border.light,
          borderStyle: 'dashed',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <FolderPlus size={40} color={theme.colors.text.secondary} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.text, { color: theme.colors.text.secondary }]}>Create new folio</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    height: 90,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 4,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
