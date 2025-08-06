import { CameraOff } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BadgeLabel from '../../../components/ui/BadgeLabel';
import { useTheme } from '../../../theme/useTheme';

interface CardAvailableOfferItemProps {
  title: string;
  seller: string;
  price: string;
  pictureUrl: string | null;
  condition: string;
}

export default function CardAvailableOfferItem({
  title,
  seller,
  price,
  pictureUrl,
  condition,
}: CardAvailableOfferItemProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      <View style={styles.imageContainer}>
        {pictureUrl ? (
          <Image source={{ uri: pictureUrl }} style={styles.image} />
        ) : (
          <View
            style={[
              styles.emptyImage,
              {
                width: '100%',
                height: '100%',
                backgroundColor: theme.colors.border.light,
                borderRadius: theme.borderRadius.small,
              },
            ]}
          >
            <CameraOff color={theme.colors.text.secondary} />
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={[
            {
              color: theme.colors.text.black,
              fontWeight: theme.typography.fontWeights.bold,
              fontSize: theme.typography.fontSizes.md,
            },
          ]}
        >
          {title}
        </Text>
        <Text style={[styles.seller, { color: theme.colors.text.secondary }]}>
          Sale by <Text style={{ fontWeight: 'bold' }}>{seller}</Text>
        </Text>
        <View style={styles.offerBottom}>
          <Text
            style={[
              {
                color: theme.colors.text.black,
                fontWeight: theme.typography.fontWeights.bold,
                fontSize: theme.typography.fontSizes.lg,
              },
            ]}
          >
            ${price}
          </Text>
          <BadgeLabel label={condition} variant="dark" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  imageContainer: {
    width: 72,
    height: 72,
    marginRight: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  emptyImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
  },
  seller: {
    fontSize: 14,
    marginTop: 4,
  },
  offerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
});
