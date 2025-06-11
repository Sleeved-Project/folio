import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CardMetaInfoProps {
  number: string;
  set: {
    name: string;
    imageSymbol: string;
  };
}

export default function CardMetaInfo({ number, set }: CardMetaInfoProps) {
  return (
    <>
      <View style={styles.metaContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.setInfo}>
            <Image
              source={{ uri: set.imageSymbol }}
              style={styles.setSymbol}
              resizeMode="contain"
            />
            <Text style={styles.setName}>{set.name}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.cardNumber}>#{number}</Text>
        </View>
      </View>

      <View style={styles.divider} />
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
    color: '#333',
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
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 16,
  },
});
