import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FolioItem as FolioItemType } from '../types';
import FolioItem from './FolioItem';
import CreateFolioButton from './CreateFolioButton';

interface FoliosListProps {
  folios: FolioItemType[];
  onFolioPress?: (id: string) => void;
  onCreatePress: () => void;
  isLoading?: boolean;
}

export default function FoliosList({
  folios,
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
      data={folios}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <FolioItem folio={item} onPress={onFolioPress} />}
      ListHeaderComponent={<CreateFolioButton onPress={onCreatePress} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
