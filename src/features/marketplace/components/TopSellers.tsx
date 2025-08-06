import { FlatList, StyleSheet, View } from 'react-native';
import TitleSection from '../../../components/ui/TitleSection';
import TopSellerItem from './TopSellerItem';

export default function TopSellers() {
  // TODODELETE: Replace with hook fetch data from API
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
  ];

  return (
    <>
      <TitleSection title="Top Sellers" />
      <View>
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
