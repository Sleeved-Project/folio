import CardsForSale from '../components/CardsForSale';
import { router } from 'expo-router';
import { useHasStripeAccount } from '../hooks/useHasStripeAccount';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';

export default function MarketplaceHome() {
  const { data: hasStripeAccount, refetch: refetchHasStripeAccount } = useHasStripeAccount();

  useRefetchOnFocus(refetchHasStripeAccount);

  const navigateToStripeSetup = () => {
    if (!hasStripeAccount) {
      router.push('/stripe-setup');
    } else {
      router.push('/sell-form');
    }
  };

  return <CardsForSale onSellPress={navigateToStripeSetup} />;
}
