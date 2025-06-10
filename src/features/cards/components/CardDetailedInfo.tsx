import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InfoGrid from '../../../components/ui/InfoGrid';
import InfoItem from '../../../components/ui/InfoItem';
import Tag from '../../../components/ui/Tag';
import FlavorTextBox from './FlavorTextBox';
import { User, Calendar, StarIcon } from 'lucide-react-native';

interface CardDetailedInfoProps {
  detailedData?: {
    artist?: {
      id: number;
      name: string;
    };
    rarity?: {
      id: number;
      label: string;
    };
    set?: {
      releaseDate: string;
    };
    subtypes?: Array<{
      id: number;
      label: string;
    }>;
    flavorText?: string;
  };
  isLoading: boolean;
  error: unknown;
}

export default function CardDetailedInfo({
  detailedData,
  isLoading,
  error,
}: CardDetailedInfoProps) {
  const hasSubtypes = detailedData?.subtypes && detailedData.subtypes.length > 0;
  const hasFlavorText = !!detailedData?.flavorText;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading additional details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error instanceof Error ? error.message : 'Error loading card details'}
        </Text>
      </View>
    );
  }

  if (!detailedData) return null;

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
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffeeee',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#e53e3e',
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
