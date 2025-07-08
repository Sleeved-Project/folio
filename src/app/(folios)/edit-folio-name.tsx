import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import { X } from 'lucide-react-native';
import FolioNameEditForm from '../../features/folio/components/create/FolioNameEditForm';
import { useFolioCreation } from '../../features/folio/context/FolioCreationContext';

export default function EditFolioNameModal() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { name, setName } = useFolioCreation();

  const handleSave = (newName: string) => {
    setName(newName);
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
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>Edit folio name</Text>
          <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
            <X size={24} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <FolioNameEditForm
          initialValue={name || 'Untitled'}
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
