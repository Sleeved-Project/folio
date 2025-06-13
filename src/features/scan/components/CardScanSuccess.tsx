import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../../cards/types';
import { Button } from '../../../components/ui';
import { displayPrice } from '../utils/price-utils';

interface CardScanSuccessProps {
  cards: Card[];
  highlightedCardId: string;
}

export default function CardScanSuccess({ cards, highlightedCardId }: CardScanSuccessProps) {
  const router = useRouter();
  const highlightedCard: Card = cards.find((card) => card.id === highlightedCardId) || cards[0];

  return (
    <>
      <Image source={{ uri: highlightedCard.imageSmall }} style={styles.image} />
      <View style={styles.actionContainer}>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardInfo}>
            <Text style={styles.priceText}>{displayPrice(highlightedCard.bestTrendPrice)}</Text>
            <Text style={styles.infoText}>Best trend price</Text>
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
          textStyle={styles.addResultsText}
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
    color: '#111',
  },
  infoText: {
    fontSize: 16,
    color: '#A09CAB',
  },
  cardDetailButton: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardDetailText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionContainer: {
    width: '90%',
    gap: 16,
  },
  text: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  image: {
    width: 345,
    height: 480,
    borderRadius: 16,
  },
  addResultsText: {
    color: '#111',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
