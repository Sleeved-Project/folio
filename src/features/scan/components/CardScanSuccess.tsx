import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Card } from '../../cards/types';
import { Button } from '../../../components/ui';

interface CardScanSuccessProps {
  cards: Card[];
}

export default function CardScanSuccess({ cards }: CardScanSuccessProps) {
  const router = useRouter();
  const card = cards[0];

  return (
    <>
      <Image source={{ uri: card.imageSmall }} style={styles.image} />
      <View style={styles.actionContainer}>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardInfo}>
            <Text style={styles.priceText}>${card.price}</Text>
            <Text style={styles.infoText}>Best trend price</Text>
          </View>
          <Link href={`/card/${card.id}`} style={styles.cardDetailButton}>
            <Text style={styles.cardDetailText}>See more</Text>
          </Link>
        </View>
        <Button
          title="Scan again"
          variant="scan"
          onPress={() => router.replace('/scan')}
          buttonStyle={styles.actionButton}
          textStyle={styles.textStyle}
        />
        <Link
          href={{
            pathname: '/additional-results',
            params: {
              cards: JSON.stringify(cards),
            },
          }}
        >
          <Text style={styles.addResultsText}>Show other results</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    width: '100%',
    gap: 16,
  },
  actionButton: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#EFF1F5',
    padding: 16,
    borderRadius: 12,
  },
  text: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  textStyle: {
    color: '#111',
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
