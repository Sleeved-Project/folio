import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DollarSign, Euro } from 'lucide-react-native';

interface PriceRowProps {
  type: string;
  value: string;
  currency?: 'USD' | 'EUR';
  isLast?: boolean;
}

export default function PriceRow({ type, value, currency = 'USD', isLast = false }: PriceRowProps) {
  return (
    <View style={[styles.container, isLast && styles.lastRow]}>
      <View style={styles.typeContainer}>
        {currency === 'EUR' ? (
          <Euro size={16} color="#4CAF50" />
        ) : (
          <DollarSign size={16} color="#4CAF50" />
        )}
        <Text style={styles.type}>{type}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});
