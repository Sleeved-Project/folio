import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../components/ui';
import { useTheme } from '../../../theme/useTheme';
import { Ad } from '../types';

interface AdActionBarProps {
  ad: Ad;
  onSeeCardDetail?: (id: string) => void;
  onBuy?: (id: string) => void;
}

export default function AdActionBar({ ad, onSeeCardDetail, onBuy }: AdActionBarProps) {
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
        variant="outline"
        onPress={() => onSeeCardDetail?.(ad.card.id)}
        buttonStyle={[styles.button]}
      />
      <Button title="Buy this card" onPress={() => onBuy?.(ad.id)} buttonStyle={styles.button} />
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
  button: {
    flex: 1,
  },
});
