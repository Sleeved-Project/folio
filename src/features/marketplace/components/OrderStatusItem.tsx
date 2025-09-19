import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { OrderDetail } from '../types';

interface OrderStatusItemProps {
  item: OrderDetail;
}

export default function OrderStatusItem({ item }: OrderStatusItemProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { padding: theme.spacing.sm }]}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: theme.typography.fontSizes.md,
          alignSelf: theme.flex.alignment.start,
        }}
      >
        Last update : {item.updatedAt}
      </Text>
      <View
        style={[
          styles.separator,
          {
            backgroundColor: theme.colors.border.light,
            marginVertical: theme.spacing.sm,
          },
        ]}
      />
      <View style={styles.lineContainer}>
        <Text style={{ fontSize: theme.typography.fontSizes.md }}>{item.status.label} </Text>
        <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
          {item.updatedAt}
        </Text>
      </View>
      <View
        style={[
          styles.separator,
          {
            backgroundColor: theme.colors.border.light,
            marginTop: theme.spacing.sm,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addressContainer: {
    alignItems: 'flex-end',
  },
  separator: {
    height: 1,
    width: '100%',
  },
});
