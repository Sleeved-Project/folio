import { useCards } from '../hooks/queries/useCardsQuery';
import { useState } from 'react';
import SearchBar from '../../../components/ui/SearchBar';
import CardListDisplay from '../components/CardListDisplay';
import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import CardFilters from '../../filters/components/CardFilters';
import { useSets } from '../../sets/hooks/queries/useSetsQuery';
import SetsList from '../../sets/screens/SetsList';
import { FormattedSet } from '../../sets/types';
import { router } from 'expo-router';
import { useFilterContext } from '../../../context/FilterContext';
import { FilterTypeEnum } from '../../filters/types';

type TabType = 'sets' | 'cards';

interface CardsListProps {
  isFiltersVisible?: boolean;
}

export default function CardsList({ isFiltersVisible = false }: CardsListProps) {
  const [cardName, setCardName] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('sets');
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
    if (activeTab !== 'sets') {
      const selected = filtersOptions[label];
      if (!selected) return;
      setSelectedFilterOption?.({
        [label]: selected,
      });
      router.push({
        pathname: '/filter-detail',
        params: {
          filterType: activeTab === 'cards' ? FilterTypeEnum.CARD : FilterTypeEnum.SET,
        },
      });
    }
  };

  return (
    <>
      <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />
      <SearchBar
        searchQuery={cardName}
        setSearchQuery={(newName: string) => setCardName(newName)}
        searchPlaceholder={activeTab === 'cards' ? 'Search by Pokemon' : 'Search by set'}
      />
      {isFiltersVisible && activeTab !== 'sets' && (
        <CardFilters toggleFilterDetail={toggleFilterDetail} filterType={FilterTypeEnum.CARD} />
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
    </>
  );
}
