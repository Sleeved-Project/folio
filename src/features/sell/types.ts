import { SellFormData } from './schemas/sellFormSchema';

export interface SellFormState {
  stepIndex: number;
  formData: Partial<SellFormData>;
}

export type SellFormAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DATA'; payload: Partial<SellFormData> }
  | { type: 'GO_TO_STEP'; payload: number };
