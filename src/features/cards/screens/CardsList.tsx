import { StyleSheet, View } from 'react-native';
import { useCards } from '../hooks/queries/useCardsQuery';
import { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import CardListDisplay from '../components/CardListDisplay';
import { useTheme } from '../../../theme/useTheme';
import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import CardFilters from '../../filters/components/CardFilters';
import FilterDetail from '../../filters/components/FilterDetail';
import { Filters } from '../../filters/types';
import { useSets } from '../../sets/hooks/queries/useSetsQuery';
import SetsList from '../../sets/screens/SetsList';
import { FormattedSet } from '../../sets/types';

type TabType = 'sets' | 'cards';

interface CardsListProps {
  isFiltersVisible?: boolean;
}

export default function CardsList({ isFiltersVisible = false }: CardsListProps) {
  const [cardName, setCardName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('cards');
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
    {
      label: 'Artist',
      values: [
        { label: 'Artist 1', id: '1' },
        { label: 'Loop', id: '2' },
        { label: 'Huuh', id: '3' },
        { label: 'Kiki', id: '4' },
        { label: 'ldozqo', id: '5' },
      ],
    },
    {
      label: 'Subtype',
      values: [
        { label: 'Subtype 1', id: '1' },
        { label: 'Loop', id: '2' },
        { label: 'Huuh', id: '3' },
        { label: 'Kiki', id: '4' },
        { label: 'ldozqo', id: '5' },
      ],
    },
    {
      label: 'Type',
      values: [
        { label: 'Type 1', id: '1' },
        { label: 'Loop', id: '2' },
        { label: 'Huuh', id: '3' },
        { label: 'Kiki', id: '4' },
        { label: 'ldozqo', id: '5' },
      ],
    },
  ];

  const cards = cardsData?.pages.flatMap((page) => page.data) ?? [];
  const sets: FormattedSet[] = setsData?.pages.flatMap((page) => page.data) ?? [];
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
      {isFiltersVisible && activeTab !== 'sets' && (
        <CardFilters
          filtersOptions={filtersOptions}
          filters={filters}
          setIsFilterDetailVisible={setIsFilterDetailVisible}
          setSelectedFilterIndex={setSelectedFilterIndex}
        />
      )}
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
      {isFilterDetailVisible && activeTab !== 'sets' && (
        <FilterDetail
          isFilterDetailVisible={isFilterDetailVisible}
          setIsFilterDetailVisible={setIsFilterDetailVisible}
          filtersOptions={filtersOptions[selectedFilterIndex ?? 0]}
          filters={filters ?? []}
          setFilters={setFilters}
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
