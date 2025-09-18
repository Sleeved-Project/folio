import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import { Button } from '../../../../components/ui';
import { useTheme } from '../../../../theme/useTheme';
import { useRouter } from 'expo-router';

const CreateFirstFolioCta = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      accessible
      accessibilityLabel="Create your first folio screen"
      accessibilityHint="Learn about folios and create your first one"
    >
      <PlusCircle
        size={80}
        color={theme.colors.primary}
        strokeWidth={1.5}
        accessible
        accessibilityLabel="Create folio icon"
        accessibilityHint="Represents creating a new folio"
      />

      <Text
        style={[styles.title, { color: theme.colors.text.primary, marginTop: theme.spacing.xl }]}
        accessible
        accessibilityRole="header"
        accessibilityLabel="Create your first folio"
      >
        Create your first folio!
      </Text>

      <Text
        style={[
          styles.description,
          { color: theme.colors.text.secondary, marginBottom: theme.spacing.xl },
        ]}
        accessible
        accessibilityLabel="Folio description"
      >
        Organize your cards by creating a folio. You can add, edit, and manage your collection
        easily.
      </Text>

      <Button
        title="Create a folio"
        variant="primary"
        onPress={() => router.push('(folios)/create-folio')}
        buttonStyle={styles.button}
        accessibilityLabel="Create a folio"
        accessibilityHint="Opens the screen to create a new folio"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    width: 220,
  },
});

export default CreateFirstFolioCta;
