import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DollarSign, Loader } from 'lucide-react-native';
import { useCardPrices } from '../hooks/queries/useCardPrices';
import Accordion from '../../../components/ui/Accordion';
import ExternalLink from '../../../components/ui/ExternalLink';
import DisclaimerBox from '../../../components/ui/DisclaimerBox';
import PriceRow from '../../../components/ui/PriceRow';

interface CardPricesInfoProps {
  cardId?: string;
}

export default function CardPricesInfo({ cardId }: CardPricesInfoProps) {
  const { data: priceData, isLoading, error } = useCardPrices(cardId || '');
  const insets = useSafeAreaInsets();

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.placeholderContainer}>
        <Loader size={24} color="#999" />
        <Text style={styles.placeholderText}>Loading price information...</Text>
      </View>
    );
  }

  // Error state
  if (error || !priceData) {
    return (
      <View style={styles.placeholderContainer}>
        <DollarSign size={24} color="#999" />
        <Text style={styles.placeholderText}>
          {error instanceof Error ? error.message : 'Unable to load price information at this time'}
        </Text>
      </View>
    );
  }

  // No price data available
  if (!priceData.hasData) {
    return (
      <View style={styles.placeholderContainer}>
        <DollarSign size={24} color="#999" />
        <Text style={styles.placeholderText}>No price information available for this card</Text>
      </View>
    );
  }

  const handleExternalLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: Math.max(16, insets.bottom) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {priceData.markets.map((market, marketIndex) => (
        <Accordion
          key={`market-${marketIndex}`}
          title={market.name}
          initiallyOpen
          rightElement={<ExternalLink url={market.url} onPress={handleExternalLinkPress} />}
        >
          <View style={styles.priceList}>
            {market.prices.map((price, priceIndex) => (
              <PriceRow
                key={`price-${priceIndex}`}
                type={price.displayType}
                value={price.formattedPrice}
                currency={price.currency}
                isLast={priceIndex === market.prices.length - 1}
              />
            ))}
          </View>
        </Accordion>
      ))}
      <DisclaimerBox
        text="Prices are for informational purposes only and may vary. Last updated today."
        containerStyle={{ marginTop: 12 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 30,
    marginTop: 12,
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  priceList: {
    marginTop: 8,
  },
});
