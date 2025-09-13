import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useEstimatedPrice } from '../hooks/queries/useEstimatedPrice';
import { useTheme } from '../../../theme/useTheme';
import { useSellForm } from '../context/SellFormContext';

export default function PriceEstimation() {
  const theme = useTheme();
  const { formData } = useSellForm();
  const { data: estimatedPrice, isLoading, error } = useEstimatedPrice(formData);

  return (
    <View>
      <Text
        style={[
          {
            fontSize: theme.typography.fontSizes.md,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        Based on recent sales and your card’s condition, this price helps you stay competitive and
        improve your chances of a quick sale
      </Text>

      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            style={[
              {
                fontSize: theme.typography.fontSizes.md,
                color: theme.colors.text.secondary,
                marginTop: theme.spacing.sm,
                textAlign: 'center',
              },
            ]}
          >
            Calculating price...
          </Text>
        </View>
      )}

      {error && (
        <Text
          style={[
            styles.price,
            {
              fontSize: theme.typography.fontSizes.md,
              color: theme.colors.text.tertiary,
              marginBottom: theme.spacing.md,
            },
          ]}
        >
          Price unavailable
        </Text>
      )}

      {estimatedPrice && (
        <Text
          style={[
            styles.price,
            {
              fontSize: theme.typography.fontSizes.xxl,
              fontWeight: theme.typography.fontWeights.semiBold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
            },
          ]}
        >
          {estimatedPrice}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
