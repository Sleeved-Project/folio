import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../../cards/types';
import { Button } from '../../../components/ui';
import { useTheme } from '../../../theme/useTheme';
import BackButton from '../../../components/ui/BackButton';
import { downloadTempImage } from '../../../lib/utils/files';
import { useScanContext } from '../context/ScanContext';

interface CardScanSuccessProps {
  cards: Card[];
  highlightedCardId: string;
}

export default function CardScanSuccess({ cards, highlightedCardId }: CardScanSuccessProps) {
  const { setScanCardData } = useScanContext();
  const router = useRouter();
  const theme = useTheme();
  const highlightedCard: Card = cards.find((card) => card.id === highlightedCardId) || cards[0];

  const handleSellCard = async () => {
    const localImageUri = await downloadTempImage(highlightedCard.extractedTempImageUrl || '');
    setScanCardData({
      id: highlightedCard.id,
      frontCardCroppedImage: localImageUri,
    });
    router.push({ pathname: '/sell-form' });
  };

  return (
    <View
      style={{ flex: 1, alignItems: 'center' }}
      accessible
      accessibilityLabel="Card scan success screen"
      accessibilityHint="Shows the scanned card with options to view, sell, or see other results"
    >
      <View style={{ position: 'absolute', top: 40, left: 16, zIndex: 10 }}>
        <BackButton
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen"
        />
      </View>

      <Image
        source={{ uri: highlightedCard.imageSmall }}
        style={[styles.image, { borderRadius: theme.borderRadius.medium }]}
        accessible
        accessibilityRole="image"
        accessibilityLabel={`Scanned card with ID: ${highlightedCard.id}`}
      />

      <View style={styles.actionContainer}>
        <View style={styles.cardInfoContainer} accessible accessibilityRole="text">
          <View style={styles.cardInfo}>
            <Text
              style={[styles.priceText, { color: theme.colors.text.primary }]}
              accessibilityLabel={`Best trend price: ${highlightedCard.bestTrendPrice ?? 'Not available'}`}
            >
              {highlightedCard.bestTrendPrice ?? 'N/A'}
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.tertiary }]}>
              Best trend price
            </Text>
          </View>

          <Button
            title="View card details"
            variant="primary"
            onPress={() => router.push(`/card/${highlightedCard.id}`)}
            accessibilityLabel="View card details"
            accessibilityHint={`Opens details page for card ID: ${highlightedCard.id}`}
          />
        </View>

        <Button
          title="Sell this card"
          variant="outline"
          onPress={handleSellCard}
          accessibilityLabel="Sell this card"
          accessibilityHint={`Lists card ID: ${highlightedCard.id} for sale`}
        />

        <Button
          title="Show other results"
          variant="ghost"
          onPress={() =>
            router.push({
              pathname: '/additional-results',
              params: { cards: JSON.stringify(cards) },
            })
          }
          textStyle={[styles.addResultsText, { color: theme.colors.text.primary }]}
          accessibilityLabel="Show other results"
          accessibilityHint="View additional cards that were scanned"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    gap: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
  },
  actionContainer: {
    width: '90%',
    gap: 16,
  },
  image: {
    marginTop: 24,
    width: 345,
    height: 480,
  },
  addResultsText: {
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
