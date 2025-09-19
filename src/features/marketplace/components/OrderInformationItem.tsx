import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { OrderDetail } from '../types';

interface OrderInformationItemProps {
  item: OrderDetail;
}

export default function OrderInformationItem({ item }: OrderInformationItemProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { padding: theme.spacing.sm }]}>
      <View style={[styles.lineContainer, { flexDirection: theme.flex.column }]}>
        <Text
          style={{ fontSize: theme.typography.fontSizes.md, color: theme.colors.text.secondary }}
        >
          Order number
        </Text>
        <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
          {item.id}
        </Text>
      </View>
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
        <Text
          style={{ fontSize: theme.typography.fontSizes.md, color: theme.colors.text.secondary }}
        >
          Price
        </Text>
        <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
          {item.prices.totalCosts}
        </Text>
      </View>
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
        <Text
          style={{ fontSize: theme.typography.fontSizes.md, color: theme.colors.text.secondary }}
        >
          Date
        </Text>
        <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
          {item.createdAt}
        </Text>
      </View>
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
        <Text
          style={{ fontSize: theme.typography.fontSizes.md, color: theme.colors.text.secondary }}
        >
          Delivery address
        </Text>
        <View style={styles.addressContainer}>
          <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
            {item.addresses.delivery.road}
          </Text>
          <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
            {item.addresses.delivery.zipcode} {item.addresses.delivery.city}
          </Text>
          <Text style={{ fontWeight: '600', fontSize: theme.typography.fontSizes.md }}>
            {item.addresses.delivery.country}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.separator,
          {
            backgroundColor: theme.colors.border.light,
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
