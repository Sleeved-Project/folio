import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useTheme } from '../../../theme/useTheme';
import EmptyStateCards from '../components/EmptyStateCards';
import FoliosList from '../components/FoliosList';
import { FolioItem } from '../types';

export default function MyFoliosScreen() {
  const theme = useTheme();
  const router = useRouter();

  // Mock data to simulate fetched folios
  const mockFolios: FolioItem[] = [
    {
      id: '1',
      name: 'My Favorite Collection',
      cardCount: 42,
      cardMarketValue: '325.50€',
      tcgPlayerValue: '$352.75',
    },
    {
      id: '2',
      name: 'Rare Cards',
      cardCount: 12,
      cardMarketValue: '678.25€',
      tcgPlayerValue: '$712.99',
    },
    {
      id: '3',
      name: 'Starter Deck',
      cardCount: 28,
      cardMarketValue: '89.99€',
      tcgPlayerValue: '$95.50',
    },
    {
      id: '4',
      name: 'Collection 2023',
      cardCount: 63,
      cardMarketValue: '425.30€',
      tcgPlayerValue: '$450.10',
    },
  ];

  const hasCards = true;

  const handleFolioPress = (id: string) => {
    // @TODO: Implement navigation to folio details
    console.log(`Folio pressed: ${id}`);
  };

  if (!hasCards) {
    return <EmptyStateCards />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <FoliosList
        folios={mockFolios}
        onFolioPress={handleFolioPress}
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
