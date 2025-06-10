import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DollarSign } from 'lucide-react-native';

export default function CardPricesInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.pricePlaceholder}>
        <DollarSign size={24} color="#999" />
        <Text style={styles.placeholderText}>Price information will be available here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  pricePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 30,
    opacity: 0.7,
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
