import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Card } from '../../cards/types';
import CardListDisplay from '../../../components/CardListDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

interface AdditionalResultsScanProps {
  cards: Card[];
}

export default function AdditionalResultsScan({ cards }: AdditionalResultsScanProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/scan-result`,
              params: {
                resultType: 'success',
                cards: JSON.stringify([cards]),
                highlightedCardId: cards[0].id,
              },
            })
          }
        >
          <ChevronLeft size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Other results</Text>
        </View>
      </View>
      <CardListDisplay cards={cards} listOrigin={'scan'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 16,
  },
  backButtonContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
});
