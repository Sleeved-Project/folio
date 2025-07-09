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
      <View style={styles.container}>
        <LoadingState />
      </View>
    );
  }

  if (!isLoading && error) {
    return <ErrorState />;
  }

  if (!foliosListData || foliosListData.length === 0) {
    return <CreateFirstFolioCta />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <FoliosList
        foliosData={foliosListData}
        onFolioPress={(id) => {
          /* TODO: navigation */
          console.log('Folio pressed:', id);
        }}
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
