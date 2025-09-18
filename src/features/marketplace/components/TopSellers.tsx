import { FlatList, StyleSheet, View } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import TopSellerItem from './TopSellerItem';

export default function TopSellers() {
  const topSellers = [
    { id: 1, name: 'Seller A', sales: 100, pictureUrl: null, rate: 4.8 },
    { id: 2, name: 'Seller B', sales: 80, pictureUrl: 'https://thumbs.dreamstime.com/b/logo-rouge-et-blanc-simple-de-pokemon-eps-74567695.jpg', rate: 4.5 },
    { id: 3, name: 'Seller C', sales: 60, pictureUrl: 'https://thumbs.dreamstime.com/b/logo-rouge-et-blanc-simple-de-pokemon-eps-74567695.jpg', rate: 4.2 },
    { id: 4, name: 'Seller D', sales: 50, pictureUrl: 'https://thumbs.dreamstime.com/b/logo-rouge-et-blanc-simple-de-pokemon-eps-74567695.jpg', rate: 4.0 },
    { id: 5, name: 'Seller E', sales: 30, pictureUrl: 'https://thumbs.dreamstime.com/b/logo-rouge-et-blanc-simple-de-pokemon-eps-74567695.jpg', rate: 3.8 },
  ];

  return (
    <>
      <TitleSection title="Top Sellers" />
      <View accessible accessibilityRole="list" accessibilityLabel="Top Sellers List">
        <FlatList
          data={topSellers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TopSellerItem
              id={item.id}
              username={item.name}
              rate={item.rate ?? 'N/A'}
              sales={item.sales}
              profilePictureUrl={item.pictureUrl}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topSellersContainer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topSellersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
