import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import TopSellerItem from '../../features/marketplace/components/TopSellerItem';
import { FlatList } from 'react-native-gesture-handler';
import SearchBar from '../../components/ui/SearchBar';
import { useState } from 'react';

export default function Marketplace() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const topSellers = [
    {
      id: 1,
      name: 'Seller A',
      sales: 100,
      pictureUrl: null,
      rate: 4.8,
    },
    {
      id: 2,
      name: 'Seller B',
      sales: 80,
      pictureUrl:
        'https://thumbs.dreamstime.com/b/logo-rouge-et-blanc-simple-de-pokemon-eps-74567695.jpg',
      rate: 4.5,
    },
    {
      id: 3,
      name: 'Seller C',
      sales: 60,
      pictureUrl: 'https://example.com/seller3.jpg',
      rate: 4.2,
    },
    {
      id: 4,
      name: 'Seller D',
      sales: 50,
      pictureUrl: null,
      rate: 4.0,
    },
    {
      id: 5,
      name: 'Seller E',
      sales: 30,
      pictureUrl: 'https://example.com/seller5.jpg',
      rate: 3.8,
    },
    {
      id: 6,
      name: 'Seller F',
      sales: 20,
      pictureUrl: 'https://example.com/seller6.jpg',
      rate: 3.5,
    },
    {
      id: 7,
      name: 'Seller G',
      sales: 10,
      pictureUrl: null,
      rate: 3.0,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="card or seller"
        />
        <Text
          style={[
            {
              color: theme.colors.text.black,
              fontWeight: theme.typography.fontWeights.bold,
              fontSize: theme.typography.fontSizes.lg,
            },
          ]}
        >
          Top Sellers
        </Text>
        <ScrollView>
          <FlatList
            data={topSellers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TopSellerItem
                id={item.id}
                name={item.name}
                rate={item.rate ?? 'N/A'}
                sales={item.sales}
                pictureUrl={item.pictureUrl}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topSellersContainer}
          />
        </ScrollView>
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
  searchContainer: {
    position: 'relative',
  },
  searchInput: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 44,
    paddingRight: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 20,
  },
  topSellersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
