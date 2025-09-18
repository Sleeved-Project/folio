import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DollarSign, Euro } from 'lucide-react-native';
import { useTheme } from '../../theme/useTheme';

interface PriceRowProps {
  type: string;
  value: string;
  currency?: 'USD' | 'EUR';
  isLast?: boolean;
}

export default function PriceRow({ type, value, currency = 'USD', isLast = false }: PriceRowProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme.colors.border.light },
        isLast && styles.lastRow,
      ]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${type}: ${value} ${currency}`}
    >
      <View style={styles.typeContainer}>
        {currency === 'EUR' ? (
          <Euro size={16} color={theme.colors.success} accessible={false} />
        ) : (
          <DollarSign size={16} color={theme.colors.success} accessible={false} />
        )}
        <Text style={[styles.type, { color: theme.colors.text.primary }]}>{type}</Text>
      </View>
      <Text style={[styles.value, { color: theme.colors.text.primary }]}>{value}</Text>
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
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});
