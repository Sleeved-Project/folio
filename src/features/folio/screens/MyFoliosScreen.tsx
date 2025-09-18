import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import FoliosList from '../components/FoliosList';
import { useFolios } from '../hooks/queries/useFolios';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import CreateFirstFolioCta from '../components/create/CreateFirstFolioCta';

export default function MyFoliosScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { data: foliosListData, isLoading, error } = useFolios();

  if (isLoading) {
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="Loading Folios"
        accessibilityHint="Displays a loading indicator while fetching folios"
      >
        <LoadingState />
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="Error"
        accessibilityHint="An error occurred while fetching folios"
      >
        <ErrorState />
      </View>
    );
  }

  if (!foliosListData || foliosListData.length === 0) {
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel="No Folios"
        accessibilityHint="Prompt to create the first folio"
      >
        <CreateFirstFolioCta />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      accessible
      accessibilityLabel="My Folios Screen"
      accessibilityHint="View your folios and create new ones"
    >
      <FoliosList
        foliosData={foliosListData}
        onFolioPress={(id) => console.log('Folio pressed:', id)}
        onCreatePress={() => router.push('(folios)/create-folio')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
