import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Edit3 } from 'lucide-react-native';
import { useTheme } from '../../../../theme/useTheme';

interface FolioNameDisplayProps {
  value: string;
  onEditPress: () => void;
}

export default function FolioNameDisplay({ value, onEditPress }: FolioNameDisplayProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Folio name</Text>

      <TouchableOpacity
        style={[
          styles.displayContainer,
          {
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.border.light,
            borderRadius: theme.borderRadius.medium,
          },
        ]}
        onPress={onEditPress}
        activeOpacity={0.7}
        accessible
        accessibilityLabel="Folio Name"
        accessibilityHint="Tap to edit the folio name"
      >
        <Text style={[styles.nameText, { color: theme.colors.text.primary }]} numberOfLines={1}>
          {value || 'Untitled'}
        </Text>

        <Edit3 size={18} color={theme.colors.text.tertiary} style={styles.editIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  displayContainer: { height: 48, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1 },
  nameText: { fontSize: 16, fontWeight: '600', flex: 1 },
  editIcon: { marginLeft: 12 },
});
