import { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import TitleSection from '../../../components/ui/TitleSection';
import { useAdsList } from '../hooks/queries/useAdsList';
import CardForSaleItem from './CardForSaleItem';
import { useTheme } from '../../../theme/useTheme';
import { Ad } from '../types';
import { Button } from '../../../components/ui';

interface CardsForSaleProps {
  hasStripeAccount?: boolean;
  onSellPress?: () => void;
  containerStyle?: ViewStyle;
}

const CardForSaleItemRenderer = ({
  item,
  cardWidth,
  gap,
}: {
  item: Ad;
  cardWidth: number;
  gap: number;
}) => (
  <View
    style={{ width: cardWidth, marginHorizontal: gap / 2 }}
    accessibilityRole="button"
    accessibilityLabel={`Card ${item.card?.name}, ${item.finish.label} finish, condition ${item.condition.label}, sold by ${item.seller.username}, price ${item.originalPrice} dollars`}
    accessibilityHint="Tap to view card details"
  >
    <CardForSaleItem item={item} />
  </View>
);

const CardsForSaleHeader = ({ onSellPress }: { onSellPress?: () => void }) => {
  const theme = useTheme();

  return (
    <>
      {onSellPress && (
        <View style={{ marginBottom: theme.spacing.md }}>
          <Button
            title="Sell a card"
            variant="gradient"
            onPress={onSellPress}
            accessibilityLabel="Sell a card"
            accessibilityHint="Tap to list a new card for sale"
          />
        </View>
      )}
      <TitleSection title="Cards for sale" style={{ marginBottom: theme.spacing.md }} />
    </>
  );
};

const CardsForSaleFooter = ({
  isFetchingNextPage,
  isLoading,
  error,
}: {
  isFetchingNextPage: boolean;
  isLoading: boolean;
  error: unknown;
}) => {
  const theme = useTheme();

  if (isFetchingNextPage || isLoading) {
    return (
      <View style={styles.loaderContainer} accessibilityLiveRegion="polite">
        <ActivityIndicator color={theme.colors.primary} size="small" />
        <Text style={[styles.text, { color: theme.colors.text.secondary }]}>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <Text style={[styles.text, styles.errorText, { color: theme.colors.danger }]} accessibilityRole="alert">
        Error loading cards
      </Text>
    );
  }
  return null;
};

const EmptyCardsMessage = ({
  isFetchingNextPage,
  isLoading,
}: {
  isFetchingNextPage: boolean;
  isLoading: boolean;
}) => {
  const theme = useTheme();

  if (isFetchingNextPage || isLoading) return null;

  return (
    <Text
      style={[styles.text, { color: theme.colors.text.secondary, fontSize: theme.typography.fontSizes.md }]}
      accessibilityRole="text"
    >
      No cards available for sale
    </Text>
  );
};

export default function CardsForSale({ onSellPress, containerStyle }: CardsForSaleProps) {
  const theme = useTheme();
  const width = useWindowDimensions().width - 32;
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useAdsList();
  const [refreshing, setRefreshing] = useState(false);

  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  const items = data?.pages.flatMap((page) => page.data) ?? [];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading && !refreshing) return <LoadingState />;
  if (error) return <ErrorState message={error instanceof Error ? error.message : 'Failed to load ads'} />;

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <CardForSaleItemRenderer item={item} cardWidth={CARD_WIDTH} gap={GAP} />}
      numColumns={NUM_COLUMNS}
      columnWrapperStyle={{ marginBottom: GAP * 2, justifyContent: 'space-between' }}
      ListHeaderComponent={<CardsForSaleHeader onSellPress={onSellPress} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ marginTop: theme.spacing.md, paddingBottom: theme.spacing.lg }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
          colors={[theme.colors.primary]}
          progressBackgroundColor={theme.colors.background.tertiary}
          title="Refreshing cards..."
          titleColor={theme.colors.text.secondary}
        />
      }
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<CardsForSaleFooter isFetchingNextPage={isFetchingNextPage} isLoading={isLoading} error={error} />}
      ListEmptyComponent={<EmptyCardsMessage isFetchingNextPage={isFetchingNextPage} isLoading={isLoading} />}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { textAlign: 'center', padding: 16 },
  errorText: { fontWeight: '500' },
  loaderContainer: { padding: 16, alignItems: 'center' },
});
