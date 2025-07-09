import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FolioItem as FolioItemType } from '../types';
import FolioItem from './FolioItem';
import CreateFolioButton from './CreateFolioButton';

interface FoliosListProps {
  foliosData: FolioItemType[];
  onFolioPress?: (id: string) => void;
  onCreatePress: () => void;
  isLoading?: boolean;
}

export default function FoliosList({
  foliosData,
  onFolioPress,
  onCreatePress,
  isLoading,
}: FoliosListProps) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <CreateFolioButton onPress={onCreatePress} />
        Loading folios...
      </View>
    );
  }

  return (
    <FlatList
      data={foliosData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FolioItem folio={item} onPress={onFolioPress} />}
      ListHeaderComponent={<CreateFolioButton onPress={onCreatePress} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
