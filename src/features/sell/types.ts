import { SellFormData } from './schemas/sellFormSchema';

export enum SellFormStepEnum {
  PHOTOS = 0,
  CARD_INFOS = 1,
  PRICE = 2,
  GRADE = 3,
  REVIEW = 4,
}

export interface SellFormState {
  stepIndex: SellFormStepEnum;
  formData: Partial<SellFormData>;
}

export type SellFormAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DATA'; payload: Partial<SellFormData> }
  | { type: 'GO_TO_STEP'; payload: SellFormStepEnum };
