import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import CardForSaleItem from '../../../features/marketplace/components/CardForSaleItem';
import { SellerRowItem } from '../../../features/marketplace/components/SellerRowItem';
import SearchBar from '../SearchBar';
import { TabOption, TabSwitcher } from '../TabSwitcher';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const TAB_CARDS = 'cards';
const TAB_SELLERS = 'sellers';
type TabType = typeof TAB_CARDS | typeof TAB_SELLERS;

export default function SearchModal({ visible, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>(TAB_CARDS);
  const isLoading = false;

  const tabOptions: TabOption<TabType>[] = [
    { id: TAB_CARDS, label: 'Cards' },
    { id: TAB_SELLERS, label: 'Sellers' },
  ];

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

  const renderEmptyState = null; // TODO: implement empty state rendering

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <View>
            <Pressable onPress={onClose}>
              <X />
            </Pressable>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchPlaceholder={activeTab === TAB_CARDS ? 'card' : 'seller'}
              showClearButton
            />
          </View>

          <View style={{ flex: 1 }}>
            <TabSwitcher
              options={tabOptions}
              activeTabId={activeTab}
              onTabChange={setActiveTab}
              containerStyle={styles.tabSwitcherContainer}
            />
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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    height: '100%',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  tabSwitcherContainer: {
    marginBottom: 16,
  },
  loadingBox: {
    padding: 16,
    alignItems: 'center',
  },
  cardGridItem: {
    flex: 1,
    margin: 8,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
