import React, { useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from '../../../components/ui';
import { CircleStopIcon } from 'lucide-react-native';
import { useTheme } from '../../../theme/useTheme';
import { useCertificate } from '../hooks/mutations/useCertificate';
import { useCertificationToken } from '../hooks/queries/useCertificationToken';
import CertificationResult from './CertificationResult';
import { useToaster } from '../../../components/ui/ToasterProvider';

interface CertificationGeneratorProps {
  onCertificationGenerated: (certificationId: string) => void;
}

export default function CertificationGenerator({
  onCertificationGenerated,
}: CertificationGeneratorProps) {
  const theme = useTheme();
  const { showToast } = useToaster();

  const {
    data: availableTokens,
    isFetching: tokensLoading,
    decrementToken,
  } = useCertificationToken();

  const { data: certification, isPending, mutate } = useCertificate();

  const handleGenerateCertification = async () => {
    if (!availableTokens || availableTokens <= 0) return;

    mutate(undefined, {
      onSuccess: (data) => {
        onCertificationGenerated(data.id);
        decrementToken();
      },
      onError: (error) => {
        showToast({
          message: error.message || 'Failed to generate certification:',
          type: 'error',
        });
      },
    });
  };

  const canCertify = useMemo(() => {
    return availableTokens && availableTokens > 0 && !isPending && !tokensLoading;
  }, [availableTokens, isPending, tokensLoading]);

  return (
    <View>
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
            fontSize: theme.typography.fontSizes.md,
            color: theme.colors.text.secondary,
          }}
        >
          Remaining tokens
        </Text>
        {tokensLoading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <View
            style={[
              styles.tokenCountContainer,
              {
                gap: theme.spacing.xs,
              },
            ]}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSizes.xl,
                color: theme.colors.text.primary,
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              {availableTokens || 0}
            </Text>
            <CircleStopIcon color={theme.colors.text.primary} size={20} />
          </View>
        )}
      </View>

      <Button
        title={'Certify with AI'}
        onPress={handleGenerateCertification}
        disabled={!canCertify}
        loading={isPending}
        buttonStyle={{ marginBottom: theme.spacing.lg }}
        leftIcon={<CircleStopIcon color={theme.colors.text.onPrimary} size={20} />}
      />

      {certification && <CertificationResult certification={certification} />}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  tokenCountContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
});
