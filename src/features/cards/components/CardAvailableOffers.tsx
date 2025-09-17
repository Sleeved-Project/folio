import { DollarSign } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ErrorState, LoadingState } from '../../../components/ui/StatusIndicators';
import TitleSection from '../../../components/ui/TitleSection';
import { useTheme } from '../../../theme/useTheme';
import { useCardAvailableOffers } from '../hooks/queries/useCardAvailableOffers';
import CardAvailableOfferItem from './CardAvailableOfferItem';

interface CardAvailableOffersProps {
  title: string;
  cardId: string;
}

export default function CardAvailableOffers({ title, cardId }: CardAvailableOffersProps) {
  const theme = useTheme();
  const { data, isLoading, error } = useCardAvailableOffers(cardId);

  const availableOffers = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const containerStyle = {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  };

  const placeholderStyle = {
    ...styles.placeholderContainer,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.small,
    marginTop: theme.spacing.sm,
  };

  const subtitleStyle = {
    ...styles.subtitle,
    color: theme.colors.text.secondary,
    marginBottom: 12,
  };

  const emptyTextStyle = {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSizes.sm,
    marginTop: theme.spacing.sm,
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message="Failed to load available offers." />;

  return (
    <View style={containerStyle}>
      <TitleSection title={title} />
      <Text style={subtitleStyle}>
        {availableOffers.length} offer{availableOffers.length > 1 ? 's' : ''} found
      </Text>
      {availableOffers.length > 0 ? (
        availableOffers.map((offer) => <CardAvailableOfferItem key={offer.id} {...offer} />)
      ) : (
        <View style={placeholderStyle}>
          <DollarSign size={24} color={theme.colors.text.secondary} />
          <Text style={emptyTextStyle}>No available offers for this card</Text>
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
});
