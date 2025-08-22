import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';

interface StepHeaderProps {
  title: string;
  description: string;
  infoField?: string;
}

export default function StepHeader({ title, description, infoField }: StepHeaderProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.lg,
        },
      ]}
    >
      <Text
        style={[
          {
            fontSize: theme.typography.fontSizes.xxl,
            fontWeight: theme.typography.fontWeights.semiBold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        {title}
      </Text>

      {description && (
        <Text
          style={[
            {
              fontSize: theme.typography.fontSizes.md,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.md,
            },
          ]}
        >
          {description}
        </Text>
      )}

      {infoField && (
        <Text
          style={[
            {
              fontSize: theme.typography.fontSizes.md,
              color: theme.colors.danger,
            },
          ]}
        >
          {infoField}
        </Text>
      )}
    </View>
  );
}
