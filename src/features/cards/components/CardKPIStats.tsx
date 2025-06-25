import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Euro, DollarSign, Layers } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';

interface CardKPIStatsProps {
  cardCount: number;
  cardMarketValue: number;
  cardMarketTrend: 'up' | 'down' | 'neutral';
  tcgPlayerValue: number;
  tcgPlayerTrend: 'up' | 'down' | 'neutral';
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'neutral' }) {
  const theme = useTheme();
  if (trend === 'up') {
    return <TrendingUp size={14} color={theme.colors.success} style={{ marginLeft: 4 }} />;
  }
  if (trend === 'down') {
    return <TrendingDown size={14} color={theme.colors.danger} style={{ marginLeft: 4 }} />;
  }
  return null;
}

export default function CardKPIStats({
  cardCount,
  cardMarketValue,
  cardMarketTrend,
  tcgPlayerValue,
  tcgPlayerTrend,
}: CardKPIStatsProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.statItem}>
          <Layers size={20} color={theme.colors.primary} />
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>{cardCount}</Text>
          <View style={styles.labelWithTrend}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Cards</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Euro size={20} color={theme.colors.primary} />
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            {cardMarketValue}€
          </Text>
          <View style={styles.labelWithTrend}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>CardMarket</Text>
            <TrendIcon trend={cardMarketTrend} />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <DollarSign size={20} color={theme.colors.primary} />
          <Text style={[styles.value, { color: theme.colors.text.primary }]}>
            ${tcgPlayerValue}
          </Text>
          <View style={styles.labelWithTrend}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>TCGPlayer</Text>
            <TrendIcon trend={tcgPlayerTrend} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  labelWithTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
  },
});
