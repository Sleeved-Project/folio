import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../../theme/useTheme';
import { TabSwitcher } from '../../components/ui/TabSwitcher';
import MyCardsScreen from '../../features/folio/screens/MyCardsScreen';
import MyFoliosScreen from '../../features/folio/screens/MyFoliosScreen';
import { useAllMyCards } from '../../features/folio/hooks/queries/useAllMyCards';
import { LoadingState } from '../../components/ui/StatusIndicators';
import EmptyStateCards from '../../features/folio/components/EmptyStateCards';

type FolioTabType = 'cards' | 'folios';

const tabOptions = [
  { id: 'cards' as const, label: 'My Cards' },
  { id: 'folios' as const, label: 'My Folios' },
];

export default function Folio() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<FolioTabType>('cards');
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAllMyCards();

  const myCardsDataFlatMap = data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isLoading && myCardsDataFlatMap?.length === 0) {
    return <EmptyStateCards />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <TabSwitcher
          options={tabOptions}
          activeTabId={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId)}
          containerStyle={styles.tabSwitcher}
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabSwitcher: {
    marginBottom: 0,
  },
});
