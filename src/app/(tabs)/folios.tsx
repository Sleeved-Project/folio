import MyCardsScreen from '../../features/folio/screens/MyCardsScreen';
import MyFoliosScreen from '../../features/folio/screens/MyFoliosScreen';
import { useAllMyCards } from '../../features/folio/hooks/queries/useAllMyCards';
import { LoadingState } from '../../components/ui/StatusIndicators';
import EmptyStateCards from '../../features/folio/components/EmptyStateCards';
import ScreenContainer from '../../components/ui/ScreenContainer';

// type FolioTabType = 'cards' | 'folios';

// const tabOptions = [
//   { id: 'cards' as const, label: 'My cards' },
//   { id: 'folios' as const, label: 'My folios' },
// ];

export default function Folio() {
  // const [activeTab, setActiveTab] = useState<FolioTabType>('cards');

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAllMyCards();
  const myCardsDataFlatMap = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) return <LoadingState />;
  if (!isLoading && myCardsDataFlatMap.length === 0) return <EmptyStateCards />;

  return (
    <ScreenContainer
      title="My collection"
      accessible
      accessibilityLabel="Folio Screen"
      accessibilityHint="View your cards and folios"
    >
      {/* <TabSwitcher
          options={tabOptions}
          activeTabId={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId)}
          containerStyle={styles.tabSwitcher}
          accessibilityLabel="Folio tab switcher"
          accessibilityHint="Switch between My cards and My folios"
        />
        {activeTab === 'cards' ? (
          <MyCardsScreen
            myCardsData={myCardsDataFlatMap}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <MyFoliosScreen />
        )} */}

      <MyCardsScreen
        myCardsData={myCardsDataFlatMap}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        error={error}
      />
    </ScreenContainer>
  );
}
