import { SelectOption } from '../../../components/ui/inputs/FormSelectInput';
import { conditionsInputDTO } from '../types';

export function mapConditionsInputDTOToSelectOption(
  conditionsInputDTO: conditionsInputDTO[]
): SelectOption[] {
  return conditionsInputDTO.map((condition) => ({
    label: condition.label,
    value: `${condition.id}`,
  }));
}
