import { StyleSheet, View } from 'react-native';
import { useCards } from '../hooks/queries/useCardsQuery';
import { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import CardListDisplay from '../components/CardListDisplay';
import { useTheme } from '../../../theme/useTheme';
import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import { useSets } from '../../sets/hooks/queries/useSetsQuery';
import SetsList from '../../sets/screens/SetsList';
import { Set } from '../../sets/types';

type TabType = 'sets' | 'cards';

export default function CardsList() {
  const [cardName, setCardName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('sets');
  const theme = useTheme();

  const {
    data: cardsData,
    isLoading: isCardsLoading,
    error: cardsError,
    fetchNextPage: fetchNextCardsPage,
    hasNextPage: hasNextCardsPage,
    isFetchingNextPage: isFetchingNextCardsPage,
  } = useCards(cardName);

  const {
    data: setsData,
    isLoading: isSetsLoading,
    error: setsError,
    fetchNextPage: fetchNextSetsPage,
    hasNextPage: hasNextSetsPage,
    isFetchingNextPage: isFetchingNextSetsPage,
  } = useSets(cardName);

  const cards = cardsData?.pages.flatMap((page) => page.data) ?? [];
  const sets: Set[] = setsData?.pages.flatMap((page) => page.data) ?? [
    {
      id: 'set1',
      name: 'Example Set',
      imageLogo: 'https://images.pokemontcg.io/base1/logo.png',
      imageSymbol: 'https://images.pokemontcg.io/base1/symbol.png',
      nbOwned: 2,
      nbTotal: 20,
    },
    {
      id: 'set2',
      name: 'Another Set',
      imageLogo: 'https://images.pokemontcg.io/base2/logo.png',
      imageSymbol: 'https://images.pokemontcg.io/base2/symbol.png',
      nbOwned: 5,
      nbTotal: 10,
    },
    {
      id: 'set3',
      name: 'Third Set',
      imageLogo: 'https://images.pokemontcg.io/base3/logo.png',
      imageSymbol: 'https://images.pokemontcg.io/base3/symbol.png',
      nbOwned: 0,
      nbTotal: 10,
    },
  ];
  const tabOptions: TabOption<TabType>[] = [
    { id: 'sets', label: 'Card Sets' },
    { id: 'cards', label: 'All Cards' },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
          paddingTop: theme.spacing.md,
          gap: theme.spacing.md,
        },
      ]}
    >
      <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
        containerStyle={{ marginTop: 8 }}
      />
      <SearchBar
        searchQuery={cardName}
        setSearchQuery={(newName: string) => setCardName(newName)}
      />
      {activeTab === 'sets' ? (
        <SetsList
          sets={sets}
          hasNextPage={hasNextSetsPage}
          isFetchingNextPage={isFetchingNextSetsPage}
          isLoading={isSetsLoading}
          fetchNextPage={fetchNextSetsPage}
          error={setsError}
        />
      ) : (
        <CardListDisplay
          cards={cards}
          hasNextPage={hasNextCardsPage}
          isFetchingNextPage={isFetchingNextCardsPage}
          isLoading={isCardsLoading}
          fetchNextPage={fetchNextCardsPage}
          error={cardsError}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
