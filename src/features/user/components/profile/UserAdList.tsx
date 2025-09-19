import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../../components/ui/StatusIndicators';
import CardForSaleItem from '../../../marketplace/components/CardForSaleItem';
import { useUserAds } from '../../hooks/queries/useUserInfo';
import TitleSection from '../../../../components/ui/TitleSection';
import { useTheme } from '../../../../theme/useTheme';
import { Ad } from '../../../marketplace/types';

interface UserAdListProps {
  userId: string;
  contentContainerStyle?: object;
}

export default function UserAdList({ userId, contentContainerStyle }: UserAdListProps) {
  const { data: ads, isLoading, error } = useUserAds(userId);
  const adsListFlat = ads?.pages.flatMap((page) => page.data) ?? ([] as Ad[]);
  const theme = useTheme();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  const GAP = 8;

  const renderItem = ({ item }: { item: Ad }) => (
    <View
      style={styles.cardWrapper}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Ad: ${item.card.name ?? 'Untitled'}`}
      accessibilityHint="View details for this ad"
    >
      <CardForSaleItem item={item} />
    </View>
  );

  return (
    <FlatList<Ad>
      data={adsListFlat}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: GAP }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={() => (
        <TitleSection title="Ads" style={{ marginBottom: theme.spacing.md }} />
      )}
      removeClippedSubviews
      accessible
      accessibilityRole="list"
      accessibilityLabel="User Ads List"
      accessibilityHint="Scroll through all ads posted by this user"
    />
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});
