import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, useWindowDimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../../theme/useTheme';
import { FormattedSet } from '../types';
import CircularProgressBar from './CircularProgressBar';

interface SetListDisplayProps {
  set: FormattedSet;
}

export default function SetListDisplay({ set }: SetListDisplayProps) {
  const router = useRouter();
  const theme = useTheme();
  const width = useWindowDimensions().width - 32;

  const GAP = 8;
  const NUM_COLUMNS = 2;
  const SET_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
  const SET_HEIGHT = SET_WIDTH;

  return (
    <View style={{ width: SET_WIDTH, marginHorizontal: GAP / 2 }}>
      <TouchableOpacity
        onPress={() => {
          router.push({ pathname: `/set/${set.id}` });
        }}
      >
        <View style={styles.occurenceContainer}>
          <Image
            source={{ uri: set.imageLogo }}
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width: SET_WIDTH,
              height: SET_HEIGHT,
              borderRadius: theme.borderRadius.medium,
              ...theme.shadows.small,
            }}
          />
          <View style={styles.symbolBadge}>
            <Image
              source={{ uri: set.imageSymbol }}
              resizeMethod="resize"
              resizeMode="contain"
              style={{
                width: 32,
                height: 32,
                borderRadius: theme.borderRadius.medium,
                ...theme.shadows.small,
              }}
            />
          </View>
          <View style={styles.occurenceBadge}>
            {set.nbOwned && set.nbOwned > 0 && <Text style={styles.badgeText}>{set.nbOwned}</Text>}
            <CircularProgressBar
              size={24}
              strokeWidth={6}
              progressPercent={set.totalPercentage}
              bgColor={'grey'}
              pgColor={'black'}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  symbolBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  occurenceContainer: {
    position: 'relative',
  },
  occurenceBadge: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
    right: 8,
    gap: 4,
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
