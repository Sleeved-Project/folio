import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import Badge from '../../../components/ui/Badge';
import { Set } from '../types';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';

interface CardSetProps {
  set: Set;
}

export default function CardSet({ set }: CardSetProps) {
  const router = useRouter();
  const theme = useTheme();
  const width = useWindowDimensions().width - 32;

  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
  const CARD_HEIGHT = CARD_WIDTH;

  return (
    <View style={{ width: CARD_WIDTH, marginHorizontal: GAP / 2 }}>
      <TouchableOpacity
        onPress={() => {
          router.push({ pathname: `/set/${set.id}` });
        }}
      >
        <View style={styles.occurenceContainer}>
          <Image
            source={{ uri: set.imageLogo }}
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              borderRadius: theme.borderRadius.medium,
              ...theme.shadows.small,
            }}
          />
          {set.nbOwned && set.nbOwned > 0 && (
            <View style={styles.occurenceBadge}>
              <Badge value={set.nbOwned} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    padding: 16,
  },
  occurenceContainer: {
    position: 'relative',
  },
  occurenceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
