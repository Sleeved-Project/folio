import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

interface ReviewItemProps {
  label: string;
  textValue?: string;
  imageUri?: string;
}

export default function ReviewItem({ label, textValue, imageUri }: ReviewItemProps) {
  const theme = useTheme();

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      {label && (
        <Text
          style={{
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.medium,
            color: theme.colors.text.tertiary,
          }}
        >
          {label}
        </Text>
      )}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { borderRadius: theme.borderRadius.medium }]}
        />
      ) : (
        textValue && (
          <Text
            style={{
              fontSize: theme.typography.fontSizes.md,
              fontWeight: theme.typography.fontWeights.semiBold,
              color: theme.colors.text.primary,
            }}
          >
            {textValue}
          </Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
});
