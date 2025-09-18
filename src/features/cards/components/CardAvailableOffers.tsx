import { DollarSign } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';
import { useCardAvailableOffers } from '../hooks/queries/useCardAvailableOffers';
import CardAvailableOfferItem from './CardAvailableOfferItem';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';

interface CardAvailableOffersProps {
  title: string;
  cardId: string;
}

export default function CardAvailableOffers({ title, cardId }: CardAvailableOffersProps) {
  const theme = useTheme();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchCardAvailableOffers,
  } = useCardAvailableOffers(cardId);

  useRefetchOnFocus(refetchCardAvailableOffers);

  const availableOffers = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load available offers." />;

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return <LoadingState />;
    }
    return null;
  };

  return (
    <View
      style={{
        marginTop: theme.spacing.sm,
      }}
    >
      <TitleSection title={title} />
      <Text style={[styles.subtitleStyle, { color: theme.colors.text.secondary }]}>
        {availableOffers.length} offer{availableOffers.length > 1 ? 's' : ''} found
      </Text>
      {availableOffers.length > 0 ? (
        <FlatList
          data={availableOffers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CardAvailableOfferItem {...item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          scrollEnabled={false}
        />
      ) : (
        <View
          style={[
            styles.placeholderStyle,
            {
              padding: theme.spacing.md,
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.small,
              marginTop: theme.spacing.sm,
            },
          ]}
        >
          <DollarSign size={24} color={theme.colors.text.secondary} />
          <Text
            style={{
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSizes.sm,
              marginTop: theme.spacing.sm,
            }}
          >
            No available offers for this card
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 12,
  },
  placeholderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitleStyle: {
    marginBottom: 12,
  },
});
