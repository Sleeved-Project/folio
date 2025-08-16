import { useQuery } from '@tanstack/react-query';
import { SelectOption } from '../../../../components/ui/inputs/FormSelectInput';

const mockFinishes: SelectOption[] = [
  { label: 'Regular', value: 'regular' },
  { label: 'Foil', value: 'foil' },
  { label: 'Etched Foil', value: 'etched' },
  { label: 'Borderless', value: 'borderless' },
  { label: 'Extended Art', value: 'extended_art' },
  { label: 'Showcase', value: 'showcase' },
];

const fetchCardFinishes = async (): Promise<SelectOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockFinishes;
};

export const useCardFinishes = () => {
  return useQuery({
    queryKey: ['finishes'],
    queryFn: fetchCardFinishes,
    staleTime: 5 * 60 * 1000,
  });
};
