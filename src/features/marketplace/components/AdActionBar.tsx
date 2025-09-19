import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../components/ui';
import { useTheme } from '../../../theme/useTheme';
import { Ad } from '../types';

interface AdActionBarProps {
  ad: Ad;
  canBuy: boolean;
  onSeeCardDetail?: (id: string) => void;
  onBuy?: (id: string) => void;
  isLoading?: boolean;
}

export default function AdActionBar({
  ad,
  canBuy,
  onSeeCardDetail,
  onBuy,
  isLoading = false,
}: AdActionBarProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          borderColor: theme.colors.border.medium,
          backgroundColor: theme.colors.background.primary,
        },
      ]}
    >
      <Button
        title="See card detail"
        variant="secondary"
        onPress={() => onSeeCardDetail?.(ad.card.id)}
        buttonStyle={styles.button}
        accessibilityRole="button"
        accessibilityLabel="See card detail"
        accessibilityHint="Opens the card details screen"
      />
      {canBuy && (
        <Button
          title="Buy this card"
          onPress={() => onBuy?.(ad.id)}
          buttonStyle={styles.button}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Buy this card"
          accessibilityHint={isLoading ? 'Buying is in progress' : 'Purchases this card'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: { flex: 1 },
});
