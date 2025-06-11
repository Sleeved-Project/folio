import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCardDetailedInfo } from '../hooks/queries/useCardDetail';
import { LoadingState, ErrorState } from '../../../components/ui/StatusIndicators';
import InfoGrid from '../../../components/ui/InfoGrid';
import InfoItem from '../../../components/ui/InfoItem';
import Tag from '../../../components/ui/Tag';
import FlavorTextBox from './FlavorTextBox';
import { User, Calendar, StarIcon } from 'lucide-react-native';

interface CardDetailedInfoProps {
  cardId?: string;
}

export default function CardDetailedInfo({ cardId }: CardDetailedInfoProps) {
  const { data: detailedData, isLoading, error } = useCardDetailedInfo(cardId || '');

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !detailedData) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Failed to load card details'}
      />
    );
  }

  const hasSubtypes = detailedData?.subtypes && detailedData.subtypes.length > 0;
  const hasFlavorText = !!detailedData?.flavorText;

  return (
    <View style={styles.container}>
      <InfoGrid>
        {detailedData.artist && (
          <InfoItem
            label="Artist"
            value={detailedData.artist.name}
            icon={<User size={20} color="#333" />}
            fullWidth
            accentBorder
          />
        )}

        {detailedData.rarity && (
          <InfoItem
            label="Rarity"
            value={detailedData.rarity.label}
            icon={<StarIcon size={20} color="#333" />}
            accentBorder
          />
        )}

        {detailedData.set?.releaseDate && (
          <InfoItem
            label="Release"
            value={new Date(detailedData.set.releaseDate).getFullYear().toString()}
            icon={<Calendar size={20} color="#333" />}
            accentBorder
          />
        )}
      </InfoGrid>

      {hasSubtypes && (
        <View style={styles.subtypesSection}>
          <Text style={styles.sectionTitle}>Subtypes</Text>
          <View style={styles.tagsContainer}>
            {detailedData.subtypes?.map((subtype, index) => (
              <Tag key={`${subtype.id || index}`} label={subtype.label} />
            ))}
          </View>
        </View>
      )}

      {hasFlavorText && (
        <View style={styles.flavorSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <FlavorTextBox text={detailedData.flavorText} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  subtypesSection: {
    marginBottom: 20,
  },
  flavorSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
