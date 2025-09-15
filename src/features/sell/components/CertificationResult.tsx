import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { Certification } from '../hooks/mutations/useCertificate';
import InfoGrid from '../../../components/ui/InfoGrid';
import InfoItem from '../../../components/ui/InfoItem';
import { BadgeCheckIcon, CalendarCheckIcon, HashIcon } from 'lucide-react-native';
import FlavorTextBox from '../../cards/components/FlavorTextBox';

interface CertificationResultProps {
  certification: Certification;
}

export default function CertificationResult({ certification }: CertificationResultProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.rowContainer,
          {
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSizes.lg,
            fontWeight: theme.typography.fontWeights.semiBold,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.background.tertiary,
            borderRadius: theme.borderRadius.round,
          }}
        >
          {certification.globalRate}
        </Text>
        <Text
          style={{
            fontSize: theme.typography.fontSizes.lg,
            fontWeight: theme.typography.fontWeights.semiBold,
          }}
        >
          {certification.label}
        </Text>
      </View>

      <InfoGrid>
        {certification.id && (
          <InfoItem
            label="Certification id"
            value={certification.id}
            icon={<HashIcon size={20} color={theme.colors.text.primary} />}
            fullWidth
            accentBorder
          />
        )}
        {certification.certifiedAt && (
          <InfoItem
            label="Certification date"
            value={certification.certifiedAt}
            icon={<CalendarCheckIcon size={20} color={theme.colors.text.primary} />}
            fullWidth
            accentBorder
          />
        )}
        {certification.centeringRate && (
          <InfoItem
            label="Centering"
            value={certification.centeringRate}
            icon={<BadgeCheckIcon size={20} color={theme.colors.text.primary} />}
            accentBorder
          />
        )}
        {certification.cornerRate && (
          <InfoItem
            label="Corner"
            value={certification.cornerRate}
            icon={<BadgeCheckIcon size={20} color={theme.colors.text.primary} />}
            accentBorder
          />
        )}
        {certification.edgeRate && (
          <InfoItem
            label="Edge"
            value={certification.edgeRate}
            icon={<BadgeCheckIcon size={20} color={theme.colors.text.primary} />}
            accentBorder
          />
        )}
        {certification.surfaceRate && (
          <InfoItem
            label="Surface"
            value={certification.surfaceRate}
            icon={<BadgeCheckIcon size={20} color={theme.colors.text.primary} />}
            accentBorder
          />
        )}
      </InfoGrid>

      {certification.description && (
        <FlavorTextBox text={certification.description} containerStyle={styles.descriptionBox} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  descriptionBox: {
    marginTop: 0,
  },
});
