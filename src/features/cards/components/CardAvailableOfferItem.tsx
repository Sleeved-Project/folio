import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { CameraOff } from 'lucide-react-native';

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
          <Text style={styles.condition}>{condition}</Text>
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
  condition: {
    fontSize: 12,
    marginTop: 4,
    backgroundColor: '#333333',
    color: '#ccc',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
});
