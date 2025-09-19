import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { TabSwitcher, TabOption } from '../../../components/ui/TabSwitcher';
import SearchBar from '../../../components/ui/SearchBar';

import { useCards } from '../hooks/queries/useCardsQuery';
import { useSets } from '../../sets/hooks/queries/useSetsQuery';
import CardListDisplay from '../components/CardListDisplay';
import SetsList from '../../sets/screens/SetsList';
import CardFilters from '../../filters/components/CardFilters';
import { useFilterContext } from '../../../context/FilterContext';
import { FilterTypeEnum } from '../../filters/types';
import { FormattedSet } from '../../sets/types';

type TabType = 'sets' | 'cards';

interface CardsListProps {
  isFiltersVisible?: boolean;
}

export default function CardsList({ isFiltersVisible = false }: CardsListProps) {
  const [cardName, setCardName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('sets');
  const theme = useTheme();
  const { cardFilters, filtersOptions, setSelectedFilterOption } = useFilterContext();

  const {
    data: cardsData,
    isLoading: isCardsLoading,
    error: cardsError,
    fetchNextPage: fetchNextCardsPage,
    hasNextPage: hasNextCardsPage,
    isFetchingNextPage: isFetchingNextCardsPage,
  } = useCards(cardName, cardFilters);

  const {
    data: setsData,
    isLoading: isSetsLoading,
    error: setsError,
    fetchNextPage: fetchNextSetsPage,
    hasNextPage: hasNextSetsPage,
    isFetchingNextPage: isFetchingNextSetsPage,
  } = useSets(cardName);

  const cards = cardsData?.pages.flatMap((page) => page.data) ?? [];
  const sets: FormattedSet[] = setsData?.pages.flatMap((page) => page.data) ?? [];

  const tabOptions: TabOption<TabType>[] = [
    { id: 'sets', label: 'Card Sets' },
    { id: 'cards', label: 'All Cards' },
  ];

  const toggleFilterDetail = (label: string) => {
    const selected = filtersOptions[label];
    if (!selected) return;

    setSelectedFilterOption?.({ [label]: selected });
    router.push({
      pathname: '/filter-detail',
      params: {
        filterType: activeTab === 'cards' ? FilterTypeEnum.CARD : FilterTypeEnum.SET,
      },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      accessible
      accessibilityLabel="Cards and sets list screen"
      accessibilityHint="Switch between cards and sets, search and apply filters"
    >
      <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
        accessibilityLabel="Tab switcher"
        accessibilityHint="Switch between card sets and all cards"
      />

      <SearchBar
        searchQuery={cardName}
        setSearchQuery={setCardName}
        searchPlaceholder={activeTab === 'cards' ? 'Search by Pokemon' : 'Search by set'}
        accessibilityLabel="Search bar"
        accessibilityHint="Type text to search for cards or sets"
      />

      {isFiltersVisible && activeTab === 'cards' && (
        <CardFilters
          filterType={FilterTypeEnum.CARD}
          toggleFilterDetail={toggleFilterDetail}
        />
      )}

      <View style={{ marginTop: theme.spacing.xl, flex: 1 }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
