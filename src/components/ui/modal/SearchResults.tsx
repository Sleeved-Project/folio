import { ShoppingBag, UserSearch } from 'lucide-react-native';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { TabOption, TabSwitcher } from '../../../components/ui/TabSwitcher';
import CardForSaleItem from '../../../features/marketplace/components/CardForSaleItem';
import { EmptySearchState } from '../../../features/marketplace/components/EmptySearchState';
import { useSearchCardAds } from '../../../features/marketplace/hooks/queries/useAdsList';
import { useSearchSellers } from '../../../features/marketplace/hooks/queries/useSearchSellers';
import SellersListDisplay from '../../../features/marketplace/components/SellersListDisplay';

const TAB_CARDS = 'cards';
const TAB_SELLERS = 'sellers';
type TabType = typeof TAB_CARDS | typeof TAB_SELLERS;

interface SearchResultsProps {
  searchQuery: string;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function SearchResults({
  searchQuery,
  activeTab,
  setActiveTab,
}: SearchResultsProps) {
  const {
    data: cardsResults,
    isLoading: isLoadingCards,
    isError: isErrorCards,
  } = useSearchCardAds(searchQuery);
  const {
    data: usersData,
    isLoading: isLoadingSellers,
    isError: isErrorSellers,
    fetchNextPage: fetchNextUsersPage,
    hasNextPage: hasNextUsersPage,
    isFetchingNextPage: isFetchingNextUsersPage,
  } = useSearchSellers(searchQuery);

  const users = usersData?.pages.flatMap((page) => page.data) ?? [];
  const tabOptions: TabOption<TabType>[] = [
    { id: TAB_CARDS, label: 'Cards' },
    { id: TAB_SELLERS, label: 'Sellers' },
  ];

  const renderEmptyState = useMemo(() => {
    if (activeTab === TAB_CARDS) {
      return (
        <EmptySearchState
          query={searchQuery}
          isLoading={isLoadingCards}
          error={
            isErrorCards
              ? "We couldn't load the cards. Please check your connection and try again."
              : null
          }
          icon={<ShoppingBag size={52} color="#000" />}
          title="Discover cards for sale"
          message="Find rare, vintage, and recent cards listed by sellers"
        />
      );
    }

    return (
      <EmptySearchState
        query={searchQuery}
        isLoading={isLoadingSellers}
        error={
          isErrorSellers
            ? "We couldn't load the sellers. Please check your connection and try again."
            : null
        }
        icon={<UserSearch size={52} color="#000" />}
        title="Connect with trusted users"
        message="Find pro shops and collectors listing unique Pokémon cards"
      />
    );
  }, [searchQuery, isLoadingCards, isErrorCards, isLoadingSellers, isErrorSellers, activeTab]);

  const cardsFlat = cardsResults?.pages?.flatMap((page) => page.data) ?? [];

  return (
    <View style={styles.container}>
      <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        containerStyle={styles.tabSwitcherContainer}
      />
      {isLoadingCards || (isLoadingSellers && searchQuery.trim().length > 0) ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator />
        </View>
      ) : activeTab === TAB_CARDS ? (
        <FlatList
          data={cardsFlat}
          key="cardsGrid"
          keyExtractor={(item) => `card-${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.cardGridItem}>
              <CardForSaleItem item={item} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          removeClippedSubviews
          windowSize={7}
          initialNumToRender={6}
          pagingEnabled
        />
      ) : (
        <SellersListDisplay
          users={users}
          hasNextPage={hasNextUsersPage}
          isFetchingNextPage={isFetchingNextUsersPage}
          isLoading={isLoadingSellers}
          fetchNextPage={fetchNextUsersPage}
          ListEmptyComponent={renderEmptyState}
          error={isErrorSellers ? new Error("Couldn't load sellers") : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabSwitcherContainer: { marginBottom: 16 },
  loadingBox: { paddingVertical: 20 },
  listContent: { paddingBottom: 20 },
  gridRow: { justifyContent: 'space-between' },
  cardGridItem: { width: '48%', marginBottom: 16 },
});
