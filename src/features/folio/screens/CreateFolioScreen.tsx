import React, { useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { Button } from '../../../components/ui';
import FolioIcon from '../components/FolioIcon';
import FolioNameDisplay from '../components/create/FolioNameDisplay';
import CardPlaceholderGrid from '../../cards/components/CardPlaceholderGrid';
import { useCreateFolio } from '../hooks/mutations/useCreateFolio';
import { useFolioCreation } from '../context/FolioCreationContext';

export default function CreateFolioScreen() {
  const theme = useTheme();
  const router = useRouter();
  const createFolio = useCreateFolio();
  const { name, reset } = useFolioCreation();

  const handleClose = useCallback(() => {
    reset();
    router.back();
  }, [reset, router]);

  const handleSave = useCallback(() => {
    createFolio.mutate(
      {
        imageUrl: '/assets/icons/icon-1.png',
        name,
        cards: [],
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  }, [createFolio, name, handleClose]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.header}>
        <FolioIcon size={80} />
        <View style={styles.nameInputContainer}>
          <FolioNameDisplay
            value={name}
            onEditPress={() =>
              router.push({
                pathname: '/(folios)/edit-folio-name',
              })
            }
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <CardPlaceholderGrid />
      </ScrollView>
      <View style={[styles.buttonsContainer, { backgroundColor: theme.colors.background.primary }]}>
        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={handleClose}
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
    padding: 16,
    gap: 16,
  },
  nameInputContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  buttonsContainer: {
    padding: 16,
    paddingTop: 24,
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
