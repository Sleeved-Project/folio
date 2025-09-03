import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import SearchBar from '../../components/ui/SearchBar';
import { TabSwitcher, TabOption } from '../../components/ui/TabSwitcher';
import CardForSaleItem from '../../features/marketplace/components/CardForSaleItem';
import { EmptySearchState } from '../../features/marketplace/components/EmptySearchState';
import { SellerRowItem } from '../../features/marketplace/components/SellerRowItem';
// import { useMarketplaceCardSearch } from '../../features/marketplace/hooks/useMarketplaceCardSearch';
// import { useMarketplaceSellerSearch } from '../../features/marketplace/hooks/useMarketplaceSellerSearch';
import { useTheme } from '../../theme/useTheme';

const TAB_CARDS = 'cards';
const TAB_SELLERS = 'sellers';
type TabType = typeof TAB_CARDS | typeof TAB_SELLERS;

export default function SearchScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>(TAB_CARDS);

  const tabOptions: TabOption<TabType>[] = [
    { id: TAB_CARDS, label: 'Cards' },
    { id: TAB_SELLERS, label: 'Sellers' },
  ];

  // Custom hooks for search
  // const {
  //   results: cardsResults,
  //   isLoading: isCardsLoading,
  //   error: cardsError,
  // } = useMarketplaceCardSearch(searchQuery, activeTab === TAB_CARDS);

  // const {
  //   results: sellersResults,
  //   isLoading: isSellersLoading,
  //   error: sellersError,
  // } = useMarketplaceSellerSearch(searchQuery, activeTab === TAB_SELLERS);

  // const isLoading = activeTab === TAB_CARDS ? isCardsLoading : isSellersLoading;
  // const error = activeTab === TAB_CARDS ? cardsError : sellersError;

  // TODODELETE : mock data
  const cardsResults = [
    {
      id: '1',
      name: 'Scyther (holo)',
      finition: 'WOTC',
      condition: 'Good',
      set: 'Wizards promo',
      price: 29.33,
      pictureUrl: 'https://images.pokemontcg.io/base1/10.png',
    },
    {
      id: '2',
      name: 'Charizard',
      finition: 'WOTC',
      condition: 'Near Mint',
      set: 'Base Set',
      price: 299.99,
      pictureUrl: 'https://images.pokemontcg.io/base1/4.png',
    },
  ];
  const sellersResults = [
    { id: 'a', username: 'max___ime', avatarUrl: 'https://i.pravatar.cc/100?img=12' },
    { id: 'b', username: 'karen28', avatarUrl: 'https://i.pravatar.cc/100?img=32' },
  ];
  const isLoading = false;
  const error = null;

  const renderEmptyState = useMemo(
    () => (
      <EmptySearchState
        query={searchQuery}
        isLoading={isLoading}
        error={error}
        emptyMessage={
          searchQuery.trim()
            ? isLoading
              ? 'Searching...'
              : 'No results found. Try different keywords.'
            : 'Search for a card or seller'
        }
      />
    ),
    [searchQuery, isLoading, error]
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder={activeTab === TAB_CARDS ? 'card' : 'seller'}
        showClearButton
      />
      <TabSwitcher
        options={tabOptions}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        containerStyle={styles.tabSwitcherContainer}
      />
      {/* <FilterChips /> */}
      {isLoading && searchQuery.trim().length > 0 ? (
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
  container: { flex: 1, padding: 16 },
  tabSwitcherContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  tabsWrap: {
    flexDirection: 'row',
    backgroundColor: '#00000010',
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabBtnActive: {
    backgroundColor: 'white',
    elevation: 1,
  },
  tabLabel: { fontWeight: '600', opacity: 0.6 },
  tabLabelActive: { opacity: 1 },
  chipsRow: { flexDirection: 'row', gap: 8, marginTop: 12, marginBottom: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#0000000D',
  },
  chipText: { fontSize: 12, fontWeight: '600' },
  loadingBox: { paddingVertical: 20 },
  listContent: { paddingBottom: 20 },
  gridRow: { justifyContent: 'space-between' },
  cardGridItem: { width: '48%', marginBottom: 16 },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  sellerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  sellerName: { flex: 1, fontSize: 16, fontWeight: '600' },
  chevron: { fontSize: 22, opacity: 0.3 },
  emptyText: { textAlign: 'center', marginTop: 40 },
  separator: { height: 1, backgroundColor: '#00000010' },
});
