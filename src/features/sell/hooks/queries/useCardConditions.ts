import { useQuery } from '@tanstack/react-query';
import { SelectOption } from '../../../../components/ui/inputs/FormSelectInput';
import { httpClient } from '../../../../lib/client/http-client';
import { ConditionsInputDTO } from '../../types';
import { mapConditionsInputDTOToSelectOption } from '../../mappers/conditionMapper';

const fetchCardConditions = async (): Promise<SelectOption[]> => {
  const response = await httpClient.get<ConditionsInputDTO[]>(`/cards/conditions`);
  return mapConditionsInputDTOToSelectOption(response);
};

export const useCardConditions = () => {
  return useQuery({
    queryKey: ['conditions'],
    queryFn: fetchCardConditions,
    staleTime: 5 * 60 * 1000,
  });
};
