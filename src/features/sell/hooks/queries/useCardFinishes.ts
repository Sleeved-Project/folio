import { useQuery } from '@tanstack/react-query';
import { SelectOption } from '../../../../components/ui/inputs/FormSelectInput';
import { FinishesInputDTO } from '../../types';
import { httpClient } from '../../../../lib/client/http-client';
import { mapFinishesInputDTOToSelectOption } from '../../mappers/finishMapper';

const fetchCardFinishes = async (): Promise<SelectOption[]> => {
  const response = await httpClient.get<FinishesInputDTO[]>(`/cards/finishes`);
  return mapFinishesInputDTOToSelectOption(response);
};

export const useCardFinishes = () => {
  return useQuery({
    queryKey: ['finishes'],
    queryFn: fetchCardFinishes,
    staleTime: 5 * 60 * 1000,
  });
};
