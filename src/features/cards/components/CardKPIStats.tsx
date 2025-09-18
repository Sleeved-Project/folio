import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextStyle } from 'react-native';
import {
  TrendingUp,
  TrendingDown,
  Euro,
  DollarSign,
  Layers,
  AlertCircle,
} from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';

interface CardKPIStatsProps {
  cardCount?: number;
  cardMarketValue?: string;
  cardMarketTrending: 'up' | 'down' | 'equal' | undefined;
  tcgPlayerValue?: string;
  tcgPlayerTrending: 'up' | 'down' | 'equal' | undefined;
  isLoading?: boolean;
  isError?: boolean;
}

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'equal' | undefined }) {
  const theme = useTheme();
  if (trend === 'up')
    return <TrendingUp size={14} color={theme.colors.success} style={{ marginLeft: 6 }} />;
  if (trend === 'down')
    return <TrendingDown size={14} color={theme.colors.danger} style={{ marginLeft: 6 }} />;
  return null;
}

function StatValue({
  value,
  isLoading,
  isError,
}: {
  value?: string | number;
  isLoading?: boolean;
  isError?: boolean;
}) {
  const theme = useTheme();
  if (isLoading) return <ActivityIndicator size="small" color={theme.colors.primary} />;
  if (isError) return <AlertCircle size={16} color={theme.colors.danger} />;
  return <Text style={[styles.value, { color: theme.colors.text.primary }]}>{value ?? '-'}</Text>;
}

function IconContainer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={[styles.iconContainer, { backgroundColor: theme.colors.variants.primaryLight }]}>
      {children}
    </View>
  );
}

export default function CardKPIStats({
  cardCount,
  cardMarketValue,
  cardMarketTrending,
  tcgPlayerValue,
  tcgPlayerTrending,
  isLoading,
  isError,
}: CardKPIStatsProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
          ...theme.shadows.small,
          borderColor: theme.colors.border.light,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.statItem}>
          <IconContainer>
            <Layers size={20} color={theme.colors.primaryForeground} />
          </IconContainer>
          <StatValue value={cardCount} isLoading={isLoading} isError={isError} />
          <View style={styles.labelWithTrend}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>Cards</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border.light }]} />

        <View style={styles.statItem}>
          <IconContainer>
            <Euro size={20} color={theme.colors.primaryForeground} />
          </IconContainer>
          <StatValue value={cardMarketValue} isLoading={isLoading} isError={isError} />
          <View style={styles.labelWithTrend}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>CardMarket</Text>
            <TrendIcon trend={cardMarketTrending} />
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.colors.border.light }]} />

        <View style={styles.statItem}>
          <IconContainer>
            <DollarSign size={20} color={theme.colors.primaryForeground} />
          </IconContainer>
          <StatValue value={tcgPlayerValue} isLoading={isLoading} isError={isError} />
          <View style={styles.labelWithTrend}>
            <Text style={[styles.label, { color: theme.colors.text.secondary }]}>TCGPlayer</Text>
            <TrendIcon trend={tcgPlayerTrending} />
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
    borderWidth: 1,
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
    fontWeight: '700' as TextStyle['fontWeight'],
    marginTop: 4,
  },
  label: {
    fontSize: 12,
  },
  labelWithTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 36,
    alignSelf: 'center',
  },
  iconContainer: {
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
});
