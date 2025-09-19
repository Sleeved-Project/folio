import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface CardMetaInfoProps {
  number: string;
  set: {
    name: string;
    imageSymbol: string;
  };
}

export default function CardMetaInfo({ number, set }: CardMetaInfoProps) {
  const theme = useTheme();

  return (
    <>
      <View
        style={styles.metaContainer}
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Set: ${set.name}, Card number: ${number}`}
      >
        <View style={styles.leftContainer}>
          <View style={styles.setInfo}>
            <Image
              source={{ uri: set.imageSymbol }}
              style={styles.setSymbol}
              resizeMode="contain"
              accessible
              accessibilityLabel={`Set symbol for ${set.name}`}
            />
            <Text style={[styles.setName, { color: theme.colors.primaryForeground }]}>
              {set.name}
            </Text>
          </View>
        </View>

        <View>
          <Text style={[styles.cardNumber, { color: theme.colors.primaryForeground }]}>
            #{number}
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border.medium }]} />
    </>
  );
}

const styles = StyleSheet.create({
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  setInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setSymbol: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  setName: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginTop: 16,
  },
});
