import { SelectOption } from '../../../components/ui/inputs/FormSelectInput';
import { FinishesInputDTO } from '../types';

export function mapFinishesInputDTOToSelectOption(
  conditionsInputDTO: FinishesInputDTO[]
): SelectOption[] {
  return conditionsInputDTO.map((condition) => ({
    label: condition.label,
    value: `${condition.id}`,
  }));
}
