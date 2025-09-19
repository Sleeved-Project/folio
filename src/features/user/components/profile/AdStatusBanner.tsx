import { Text, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';

export default function AdStatusBanner({ status }: { status: { id: string; label: string } }) {
  const theme = useTheme();

  const width = useWindowDimensions().width - 32;

  const GAP = 8;
  const NUM_COLUMNS = 2;
  const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  const statusColors: Record<string, { backgroundColor: string; textColor: string }> = {
    // Published: { backgroundColor: theme.colors.success, textColor: theme.colors.successForeground },
    Sold: {
      backgroundColor: theme.colors.variants.primaryLight,
      textColor: theme.colors.text.primary,
    },
    // Draft: { backgroundColor: theme.colors.warning, textColor: theme.colors.warningForeground },
    // Archived: { backgroundColor: theme.colors.info, textColor: theme.colors.infoForeground },
  };

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        width: CARD_WIDTH,
        padding: 4,
        alignItems: 'center',
        borderTopLeftRadius: theme.borderRadius.small,
        borderTopRightRadius: theme.borderRadius.small,
        overflow: 'hidden',
        backgroundColor:
          statusColors[status.label]?.backgroundColor || theme.colors.background.primary,
      }}
    >
      <Text style={{ color: statusColors[status.label]?.textColor || theme.colors.text.primary }}>
        {status.label}
      </Text>
    </View>
  );
}
