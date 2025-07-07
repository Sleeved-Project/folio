import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { Button } from '../../../components/ui';
import FolioIcon from '../components/FolioIcon';
import FolioNameInput from '../components/create/FolioNameInput';
import FolioNameDisplay from '../components/create/FolioNameDisplay';

export default function CreateFolioScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [folioName, setFolioName] = useState('Untitled');

  const handleSave = () => {
    // TODO: Implement save logic with folioName
    console.log('Save folio:', folioName);
    router.back();
  };

  const handleEditName = () => {
    router.push({
      pathname: '/(folios)/edit-folio-name',
      params: { currentName: folioName },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header with icon and name input */}
      <View style={styles.header}>
        <FolioIcon size={80} />
        <View style={styles.nameInputContainer}>
          <FolioNameDisplay value={folioName} onEditPress={handleEditName} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>

        {/* TODO: Add form fields here */}
      </View>

      {/* Fixed buttons at bottom with SafeArea */}
      <View
        style={[
          styles.buttonsContainer,
          {
            backgroundColor: theme.colors.background.primary,
          },
        ]}
      >
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => router.back()}
            buttonStyle={[styles.button, styles.cancelButton]}
          />
          <Button
            title="Save"
            variant="primary"
            onPress={handleSave}
            buttonStyle={[styles.button, styles.saveButton]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 16,
    gap: 16,
  },
  nameInputContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  buttonsContainer: {
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    marginRight: 6,
  },
  saveButton: {
    marginLeft: 6,
  },
});
