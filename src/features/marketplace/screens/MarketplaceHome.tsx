import CardsForSale from '../components/CardsForSale';
import { router } from 'expo-router';
import { useHasValidStripeAccount } from '../hooks/useHasValidStripeAccount';
import { useRefetchOnFocus } from '../../../hooks/useRefetchOnFocus';

export default function MarketplaceHome() {
  const { data: hasValidStripeAccount, refetch: refetchHasValidStripeAccount } =
    useHasValidStripeAccount();

  useRefetchOnFocus(refetchHasValidStripeAccount);

  const navigateToStripeSetup = () => {
    if (!hasValidStripeAccount) {
      router.push('/stripe-setup');
    } else {
      router.push('/sell-form');
    }
  };

  return <CardsForSale onSellPress={navigateToStripeSetup} />;
}
