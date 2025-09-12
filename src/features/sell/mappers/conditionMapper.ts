import { SelectOption } from '../../../components/ui/inputs/FormSelectInput';
import { ConditionsInputDTO } from '../types';

export function mapConditionsInputDTOToSelectOption(
  conditionsInputDTO: ConditionsInputDTO[]
): SelectOption[] {
  return conditionsInputDTO.map((condition) => ({
    label: condition.label,
    value: `${condition.id}`,
  }));
}
