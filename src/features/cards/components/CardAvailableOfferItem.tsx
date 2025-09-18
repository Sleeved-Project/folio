import { router } from 'expo-router';
import { CameraOff, CircleStopIcon } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BadgeLabel from '../../../components/ui/BadgeLabel';
import { useTheme } from '../../../theme/useTheme';
import { CardAvailableOffer } from '../types';

export default function CardAvailableOfferItem({
  id,
  certificate,
  seller,
  originalPrice,
  rectoImageUrl,
  condition,
  finish,
}: CardAvailableOffer) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      key={id}
      onPress={() => router.push(`/ad/${id}`)}
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.light,
          borderWidth: 1,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        {rectoImageUrl ? (
          <Image source={{ uri: rectoImageUrl }} style={styles.image} />
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <View>
            <Text
              style={[
                {
                  color: theme.colors.text.black,
                  fontWeight: theme.typography.fontWeights.bold,
                  fontSize: theme.typography.fontSizes.md,
                },
              ]}
            >
              Finish : {finish.label}
            </Text>
            <Text style={[styles.seller, { color: theme.colors.text.secondary }]}>
              Sale by <Text style={{ fontWeight: 'bold' }}>{seller.username}</Text>
            </Text>
          </View>
          {certificate && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSizes.md,
                  color: theme.colors.text.black,
                  fontWeight: theme.typography.fontWeights.bold,
                }}
              >
                {certificate.globalRating}
              </Text>
              <CircleStopIcon style={{ marginLeft: 5 }} size={24} color={theme.colors.text.black} />
            </View>
          )}
        </View>
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
            ${originalPrice}
          </Text>
          <BadgeLabel label={condition.label} variant="dark" />
        </View>
      </View>
    </TouchableOpacity>
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
    width: 60,
    height: 80,
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
