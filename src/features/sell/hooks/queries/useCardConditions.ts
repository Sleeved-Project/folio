import { useQuery } from '@tanstack/react-query';
import { SelectOption } from '../../../../components/ui/inputs/FormSelectInput';

const mockConditions: SelectOption[] = [
  { label: 'Mint (M)', value: 'mint' },
  { label: 'Near Mint (NM)', value: 'near_mint' },
  { label: 'Excellent (EX)', value: 'excellent' },
  { label: 'Good (G)', value: 'good' },
  { label: 'Light Played (LP)', value: 'light_played' },
  { label: 'Played (P)', value: 'played' },
  { label: 'Poor', value: 'poor' },
];

const fetchCardConditions = async (): Promise<SelectOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockConditions;
};

export const useCardConditions = () => {
  return useQuery({
    queryKey: ['conditions'],
    queryFn: fetchCardConditions,
    staleTime: 5 * 60 * 1000,
  });
};
