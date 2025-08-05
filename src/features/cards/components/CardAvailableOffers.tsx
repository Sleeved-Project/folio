import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';
import CardAvailableOfferItem from './CardAvailableOfferItem';

interface CardAvailableOffersProps {
  cardId: string;
}

export default function CardAvailableOffers({ cardId }: CardAvailableOffersProps) {
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
          marginTop: theme.spacing?.sm || 12,
          marginBottom: theme.spacing?.lg || 24,
        }}
      >
        <Text
          style={{
            fontWeight: theme.typography?.fontWeights?.bold || 'bold',
            fontSize: theme.typography?.fontSizes?.md || 16,
            marginBottom: 4,
            color: theme.colors?.text?.primary || '#000',
          }}
        >
          Available Offers
        </Text>
        <View
          style={[
            styles.placeholderContainer,
            {
              padding: theme.spacing?.md || 16,
              backgroundColor: theme.colors?.background?.secondary || '#f9f9f9',
              borderRadius: theme.borderRadius?.small || 10,
              marginTop: theme.spacing?.sm || 12,
              marginBottom: theme.spacing?.lg || 24,
            },
          ]}
        >
          <DollarSign size={24} color={theme.colors?.text?.secondary || '#999'} />
          <Text
            style={{
              color: theme.colors?.text?.secondary || '#666',
              fontSize: theme.typography?.fontSizes?.sm || 14,
              marginTop: theme.spacing?.sm || 8,
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
        marginTop: theme.spacing?.sm || 12,
        marginBottom: theme.spacing?.lg || 24,
      }}
    >
      <Text
        style={[
          styles.title,
          {
            fontWeight: theme.typography?.fontWeights?.bold || 'bold',
            fontSize: theme.typography?.fontSizes?.md || 16,
            marginBottom: 4,
            color: theme.colors?.text?.primary || '#000',
          },
        ]}
      >
        Available Offers
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: theme.colors?.text?.secondary || '#666', marginBottom: 12 },
        ]}
      >
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
