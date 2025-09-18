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
    <View
      style={{ marginBottom: theme.spacing.md }}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={label}
      accessibilityHint={
        imageUri
          ? 'Displays an image associated with this review'
          : textValue
          ? `Displays the review text: ${textValue}`
          : 'No review content'
      }
    >
      {label && (
        <Text
          style={{
            fontSize: theme.typography.fontSizes.md,
            fontWeight: theme.typography.fontWeights.medium,
            color: theme.colors.text.tertiary,
          }}
          accessibilityRole="header"
        >
          {label}
        </Text>
      )}
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { borderRadius: theme.borderRadius.medium }]}
          accessible
          accessibilityRole="image"
          accessibilityLabel={label}
        />
      ) : (
        textValue && (
          <Text
            style={{
              fontSize: theme.typography.fontSizes.md,
              fontWeight: theme.typography.fontWeights.semiBold,
              color: theme.colors.text.primary,
            }}
            accessible
            accessibilityRole="text"
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
