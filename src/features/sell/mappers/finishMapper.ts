import { SelectOption } from '../../../components/ui/inputs/FormSelectInput';
import { finishesInputDTO } from '../types';

export function mapFinishesInputDTOToSelectOption(
  conditionsInputDTO: finishesInputDTO[]
): SelectOption[] {
  return conditionsInputDTO.map((condition) => ({
    label: condition.label,
    value: `${condition.id}`,
  }));
}
