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
      username: 'sellerA',
      sales: 100,
      profilePictureUrl:
        'https://i2.seadn.io/ethereum/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/28a919306e2edf12b0e7a5c956a248b4.png?w=1000',
      rate: 4.8,
    },
    {
      id: 2,
      username: 'sellerB',
      sales: 80,
      profilePictureUrl:
        'https://thumbs.dreamstime.com/b/logo-rouge-et-blanc-simple-de-pokemon-eps-74567695.jpg',
      rate: 4.5,
    },
    {
      id: 3,
      username: 'sellerC',
      sales: 60,
      profilePictureUrl:
        'https://i2.seadn.io/ethereum/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/94ae26b425b45ae67acf171ae7b70487.png?w=1000',
      rate: 4.2,
    },
    {
      id: 4,
      username: 'sellerD',
      sales: 50,
      profilePictureUrl: null,
      rate: 4.0,
    },
    {
      id: 5,
      username: 'sellerE',
      sales: 30,
      profilePictureUrl: null,
      rate: 3.8,
    },
    {
      id: 6,
      username: 'sellerF',
      sales: 20,
      profilePictureUrl:
        'https://i2.seadn.io/ethereum/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/d5b4e98d43e25aa170fe7f7dd0ae5c6e.png?w=1000',
      rate: 3.5,
    },
    {
      id: 7,
      username: 'sellerG',
      sales: 10,
      profilePictureUrl: null,
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
                username={item.username}
                rate={item.rate ?? 'N/A'}
                sales={item.sales}
                profilePictureUrl={item.profilePictureUrl}
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
