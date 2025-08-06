import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import BadgeLabel from '../../../components/ui/BadgeLabel';
import { useTheme } from '../../../theme/useTheme';
import { CardForSale } from '../types';

interface CardForSaleItemProps {
  item: CardForSale;
}

export default function CardForSaleItem({ item }: CardForSaleItemProps) {
  const theme = useTheme();
  const width = useWindowDimensions().width - 32;
  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
  const CARD_HEIGHT = CARD_WIDTH * 1.36;

  return (
    <View key={item.id} style={styles.cardItem}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: item.pictureUrl }}
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            borderRadius: theme.borderRadius.medium,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
          }}
        >
          <BadgeLabel label={item.finition} variant="light" />
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
        {item.name} ({item.finition})
      </Text>
      <Text style={[{ color: theme.colors.text.secondary }]}>{item.set}</Text>
      <Text style={[styles.cardPrice, { fontWeight: theme.typography.fontWeights.bold }]}>
        ${item.price}
      </Text>
    </View>
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
