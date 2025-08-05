import { useReducer } from 'react';
import { SellFormAction, SellFormState } from '../types';

export const steps = ['Photos', 'Card', 'Price', 'Grade', 'Review'];

export const initialState: SellFormState = {
  stepIndex: 0,
  formData: {},
};

export function reducer(state: SellFormState, action: SellFormAction): SellFormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, stepIndex: state.stepIndex + 1 };
    case 'PREV_STEP':
      return { ...state, stepIndex: state.stepIndex - 1 };
    case 'UPDATE_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    default:
      return state;
  }
}

export function useSellFormReducer() {
  return useReducer(reducer, initialState);
}
