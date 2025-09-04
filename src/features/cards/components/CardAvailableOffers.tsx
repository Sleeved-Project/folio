import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';
import CardAvailableOfferItem from './CardAvailableOfferItem';

interface CardAvailableOffersProps {
  title: string;
  cardId: string;
}

export default function CardAvailableOffers({ title, cardId }: CardAvailableOffersProps) {
  const theme = useTheme();

  // TODODELETE : Mock data for available offers
  console.log('CardAvailableOffers rendered for cardId:', cardId);
  const availableOffers = [
    {
      id: 0,
      title: 'Example Offer 1',
      seller: 'Seller A',
      price: '10.00',
      pictureUrl: null,
      condition: 'Near Mint',
    },
    {
      id: 1,
      title: 'Example Offer 2',
      seller: 'Seller B',
      price: '12.50',
      pictureUrl: 'https://example.com/image2.jpg',
      condition: 'Lightly Played',
    },
  ];

  if (availableOffers.length === 0) {
    return (
      <View
        style={{
          marginTop: theme.spacing.sm,
          marginBottom: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            fontWeight: theme.typography.fontWeights.bold,
            fontSize: theme.typography.fontSizes.md,
            marginBottom: 4,
            color: theme.colors.text.primary,
          }}
        >
          Available Offers
        </Text>
        <View
          style={[
            styles.placeholderContainer,
            {
              padding: theme.spacing.md,
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.small,
              marginTop: theme.spacing.sm,
              marginBottom: theme.spacing.lg,
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
      </View>
    );
  }

  // TODOCREATE : Add isLoading and error check after future hook integration

  return (
    <View
      style={{
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.lg,
      }}
    >
      <Text
        style={[
          styles.title,
          {
            fontWeight: theme.typography.fontWeights.bold,
            fontSize: theme.typography.fontSizes.md,
            marginBottom: 4,
            color: theme.colors.text.primary,
          },
        ]}
      >
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.text.secondary, marginBottom: 12 }]}>
        {availableOffers.length} offers found
      </Text>
      {availableOffers.map((item) => (
        <CardAvailableOfferItem key={item.id} {...item} />
      ))}
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
