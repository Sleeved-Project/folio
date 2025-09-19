import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import BadgeLabel from '../../../components/ui/BadgeLabel';
import { useTheme } from '../../../theme/useTheme';
import { Ad } from '../types';
import AdStatusBanner from '../../user/components/profile/AdStatusBanner';

interface AdItemProps {
  item: Ad;
}

export default function CardForSaleItem({ item }: AdItemProps) {
  const theme = useTheme();
  const width = useWindowDimensions().width - 32;
  const [imageError, setImageError] = useState(false);

  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
  const CARD_HEIGHT = CARD_WIDTH * 1.36;

  return (
    <TouchableOpacity key={item.id} onPress={() => router.push(`/ad/${item.id}`)}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ position: 'relative' }}>
          {item.status.label == 'Sold' && <AdStatusBanner status={item.status} />}
          {imageError ? (
            <View
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                backgroundColor: theme.colors.background.secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: theme.colors.text.secondary, textAlign: 'center', padding: 16 }}
              >
                No image
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: item.rectoImageUrl }}
              onError={() => setImageError(true)}
              style={[
                {
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  borderRadius: theme.borderRadius.medium,
                },
              ]}
            />
          )}

          <View
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
            }}
          >
            <BadgeLabel label={item.condition.label} variant="light" />
          </View>
        </View>

        <Text
          style={{
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSizes.lg,
            fontWeight: theme.typography.fontWeights.bold,
            marginTop: 8,
          }}
        >
          {item.card?.name} ({item.finish.label})
        </Text>

        <Text style={[{ color: theme.colors.text.secondary }]}>{item.seller.username}</Text>

        <Text style={{ fontWeight: theme.typography.fontWeights.bold, paddingTop: 2 }}>
          {item.originalPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
