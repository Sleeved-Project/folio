import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../../cards/types';
import { Button } from '../../../components/ui';
import { useTheme } from '../../../theme/useTheme';

interface CardScanSuccessProps {
  cards: Card[];
  highlightedCardId: string;
}

export default function CardScanSuccess({ cards, highlightedCardId }: CardScanSuccessProps) {
  const router = useRouter();
  const theme = useTheme();
  const highlightedCard: Card = cards.find((card) => card.id === highlightedCardId) || cards[0];

  return (
    <>
      <Image
        source={{ uri: highlightedCard.imageSmall }}
        style={[styles.image, { borderRadius: theme.borderRadius.medium }]}
      />
      <View style={styles.actionContainer}>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardInfo}>
            <Text style={[styles.priceText, { color: theme.colors.text.primary }]}>
              {highlightedCard.bestTrendPrice}
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.tertiary }]}>
              Best trend price
            </Text>
          </View>
          <Button
            title="See more"
            variant="primary"
            onPress={() => router.push(`/card/${highlightedCard.id}`)}
          />
        </View>
        <Button title="Scan again" variant="outline" onPress={() => router.replace('/scan')} />
        <Button
          title="Show other results"
          variant="ghost"
          onPress={() =>
            router.push({
              pathname: '/additional-results',
              params: {
                cards: JSON.stringify(cards),
              },
            })
          }
          textStyle={[styles.addResultsText, { color: theme.colors.text.primary }]}
        />
      </View>
    </>
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
    width: 345,
    height: 480,
  },
  addResultsText: {
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
