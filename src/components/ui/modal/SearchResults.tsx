import { useMemo } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import { TabSwitcher, TabOption } from '../../../components/ui/TabSwitcher';
import { EmptySearchState } from '../../../features/marketplace/components/EmptySearchState';
import CardForSaleItem from '../../../features/marketplace/components/CardForSaleItem';
import { SellerRowItem } from '../../../features/marketplace/components/SellerRowItem';
import { UserSearch, ShoppingBag } from 'lucide-react-native';
import { useSearchCardsForSale } from '../../../features/marketplace/hooks/useSearchCards';
import { useSearchSellers } from '../../../features/marketplace/hooks/useSearchSellers';

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
  } = useSearchCardsForSale(searchQuery);
  const {
    data: sellersResults,
    isLoading: isLoadingSellers,
    isError: isErrorSellers,
  } = useSearchSellers(searchQuery);

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
          error={isErrorCards ? 'An error occurred' : null}
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
        error={isErrorSellers ? 'An error occurred' : null}
        icon={<UserSearch size={52} color="#000" />}
        title="Connect with trusted sellers"
        message="Find pro shops and collectors listing unique Pokémon cards"
      />
    );
  }, [searchQuery, isLoadingCards, isErrorCards, isLoadingSellers, isErrorSellers, activeTab]);

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
          data={cardsResults}
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
        />
      ) : (
        <FlatList
          data={sellersResults}
          key="sellersList"
          keyExtractor={(item) => `seller-${item.id}`}
          renderItem={({ item }) => (
            <SellerRowItem
              item={item}
              onPress={() => {
                // Navigate to seller details
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          removeClippedSubviews
          windowSize={11}
          initialNumToRender={10}
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
  separator: { height: 1, backgroundColor: '#00000010' },
});
