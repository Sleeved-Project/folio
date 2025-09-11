import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import BadgeLabel from '../../../components/ui/BadgeLabel';
import { useTheme } from '../../../theme/useTheme';
import { Ad } from '../types';
import { useState } from 'react';
import { router } from 'expo-router';

interface AdItemProps {
  item: Ad;
}

export default function CardForSaleItem({ item }: AdItemProps) {
  const theme = useTheme();
  const width = useWindowDimensions().width - 32;
  const [imageError, setImageError] = useState(false);

  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
  const CARD_HEIGHT = CARD_WIDTH * 1.36;

  return (
    <Pressable key={item.id} onPress={() => router.push(`/ad/${item.id}`)}>
      <View style={styles.cardItem}>
        <View style={{ position: 'relative' }}>
          {imageError ? (
            <View
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                backgroundColor: theme.colors.background.secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={[styles.text, { color: theme.colors.text.secondary }]}>No image</Text>
            </View>
          ) : (
            <Image
              source={{ uri: item.rectoImageUrl }}
              onError={() => setImageError(true)}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
              }}
            />
          )}

          <View
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
            }}
          >
            <BadgeLabel label={item.condition.label} variant="light" />
          </View>
        </View>

        <Text
          style={[
            styles.cardName,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSizes.lg,
              fontWeight: theme.typography.fontWeights.bold,
              marginTop: 8,
            },
          ]}
        >
          {item.card?.name} ({item.finish.label})
        </Text>

        <Text style={[{ color: theme.colors.text.secondary }]}>{item.seller.username}</Text>

        <Text style={[styles.cardPrice, { fontWeight: theme.typography.fontWeights.bold }]}>
          ${item.originalPrice}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardName: {
    fontSize: 16,
    color: '#333',
  },
  cardPrice: {
    fontSize: 16,
    color: '#808080',
  },
  text: {
    textAlign: 'center',
    padding: 16,
  },
});
