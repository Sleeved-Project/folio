import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { DollarSign, View } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';
import CardAvailableOfferItem from './CardAvailableOfferItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CardAvailableOffersProps {
  cardId: string;
}

export default function CardAvailableOffers({ cardId }: CardAvailableOffersProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  console.log('CardAvailableOffers rendered for cardId:', cardId);

  // TODODELETE : Mock data for available offers
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

  const styles = StyleSheet.create({
    placeholderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing?.md || 16,
    },
    placeholderText: {
      color: theme.colors?.text?.secondary || '#666',
      fontSize: theme.typography?.fontSizes?.sm || 14,
      marginTop: theme.spacing?.sm || 8,
    },
    title: {
      fontWeight: theme.typography?.fontWeights?.bold || 'bold',
      fontSize: theme.typography?.fontSizes?.md || 16,
      marginBottom: 4,
      color: theme.colors?.text?.primary || '#000',
    },
  });

  if (availableOffers.length === 0) {
    return (
      <View style={styles.placeholderContainer}>
        <DollarSign size={24} color={theme.colors?.text?.secondary || '#999'} />
        <Text style={styles.placeholderText}>No available offers for this card</Text>
      </View>
    );
  }

  // TODOCREATE : Add isLoading and error check after future hook integration

  return (
    <ScrollView
      contentContainerStyle={[{ paddingTop: 16, paddingBottom: Math.max(16, insets.bottom) }]}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontWeight: theme.typography.fontWeights.bold,
          fontSize: theme.typography.fontSizes.md,
          marginBottom: 4,
        }}
      >
        Available Offers
      </Text>
      <Text style={{ color: theme.colors.text.secondary, marginBottom: 12 }}>
        {availableOffers.length} offers found
      </Text>
      {availableOffers.map((offer) => (
        <CardAvailableOfferItem key={offer.id} {...offer} />
      ))}
    </ScrollView>
  );
}
