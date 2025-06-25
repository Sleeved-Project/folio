import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { FolioItem as FolioItemType } from '../types';
import FolioIcon from './FolioIcon';

interface FolioItemStatProps {
  label: string;
  value: string | number;
}

function FolioItemStat({ label, value }: FolioItemStatProps) {
  const theme = useTheme();

  return (
    <View style={styles.statItem}>
      <Text style={[styles.statLabel, { color: theme.colors.text.tertiary }]}>{label}</Text>
      <Text style={[styles.statValue, { color: theme.colors.text.secondary }]}>{value}</Text>
    </View>
  );
}

interface FolioItemProps {
  folio: FolioItemType;
  onPress?: (id: string) => void;
}

export default function FolioItem({ folio, onPress }: FolioItemProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.medium,
          borderWidth: 1,
          borderColor: theme.colors.border.light,
          ...theme.shadows.small,
        },
      ]}
      onPress={() => onPress && onPress(folio.id)}
    >
      <View style={[styles.iconContainer, { borderRadius: theme.borderRadius.small }]}>
        <FolioIcon iconPath={folio.iconPath} size={80} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.folioName, { color: theme.colors.text.primary }]} numberOfLines={1}>
          {folio.name}
        </Text>

        <View style={styles.statsContainer}>
          <FolioItemStat label="Cards" value={folio.cardCount} />
          <FolioItemStat label="Card Market" value={folio.cardMarketValue} />
          <FolioItemStat label="TCG Player" value={folio.tcgPlayerValue} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 110,
  },
  iconContainer: {
    marginRight: 16,
    width: 80,
    height: 80,
  },
  contentContainer: {
    flex: 1,
  },
  folioName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    marginRight: 16,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '500',
  },
});
