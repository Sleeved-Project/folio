import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Card } from '../../cards/types';
import CardListDisplay from '../../cards/components/CardListDisplay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';

interface AdditionalResultsScanProps {
  cards: Card[];
}

export default function AdditionalResultsScan({ cards }: AdditionalResultsScanProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: `/scan-result`,
              params: {
                resultType: 'success',
                cards: JSON.stringify(cards),
                highlightedCardId: cards[0]?.id,
              },
            })
          }
        >
          <ChevronLeft size={32} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSizes.xl,
                fontWeight: theme.typography.fontWeights.semiBold,
              },
            ]}
          >
            Other results
          </Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <CardListDisplay cards={cards} listOrigin={'scan'} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
