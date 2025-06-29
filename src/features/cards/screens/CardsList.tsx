import { StyleSheet, View } from 'react-native';
import { useCards } from '../hooks/queries/useCardsQuery';
import { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import CardListDisplay from '../components/CardListDisplay';
import { useTheme } from '../../../theme/useTheme';
import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import CardSetDisplay from '../components/CardSetDisplay';
import { useSets } from '../hooks/queries/useSetsQuery';
import CardFilters from '../../filters/components/CardFilters';
import FilterDetail from '../../filters/components/FilterDetail';
import { Filters } from '../../filters/types';

type TabType = 'sets' | 'cards';

export default function CardsList() {
  const [cardName, setCardName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('sets');
  const isFiltersVisible = true;
  const [isFilterDetailVisible, setIsFilterDetailVisible] = useState<boolean>(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState<number | null>(null);

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

  const filtersOptions = [
    { label: 'Artist', values: ['Artist 1', 'Loop', 'Huuh', 'Kiki', 'ldozqo'] },
    { label: 'Subtype', values: ['Subtype 1', 'Loop', 'Huuh', 'Kiki'] },
    { label: 'Type', values: ['Type 1', 'Loop', 'Huuh', 'Kiki'] },
  ];

  const cards = cardsData?.pages.flatMap((page) => page.data) ?? [];
  const sets = setsData?.pages.flatMap((page) => page.data) ?? [];
  const tabOptions: TabOption<TabType>[] = [
    { id: 'sets', label: 'Card Sets' },
    { id: 'cards', label: 'All Cards' },
  ];

  const [filters, setFilters] = useState<Filters>();

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
      {isFiltersVisible && (
        <CardFilters
          filters={filtersOptions}
          setIsFilterDetailVisible={setIsFilterDetailVisible}
          setSelectedFilterIndex={setSelectedFilterIndex}
        />
      )}
      {activeTab === 'sets' ? (
        <CardSetDisplay
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
      <FilterDetail
        isFilterDetailVisible={isFilterDetailVisible}
        filterOptions={filtersOptions[selectedFilterIndex ?? 0]}
        filters={filters ?? []}
        setFilters={setFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
