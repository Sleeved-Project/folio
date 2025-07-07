import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import { X } from 'lucide-react-native';
import FolioNameEditForm from '../../features/folio/components/create/FolioNameEditForm';

export default function EditFolioNameModal() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentName } = useLocalSearchParams<{ currentName: string }>();

  const handleSave = (name: string) => {
    // TODO: Implement save logic avec le nom validé
    console.log('Save folio name:', name);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleCancel} />
      </View>

      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: theme.colors.background.primary,
            borderRadius: theme.borderRadius.large,
            marginTop: Math.max(insets.top, 24) + 60,
            ...theme.shadows.medium,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>Edit Folio Name</Text>
          <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
            <X size={24} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <FolioNameEditForm
          initialValue={currentName || 'Untitled'}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
});
