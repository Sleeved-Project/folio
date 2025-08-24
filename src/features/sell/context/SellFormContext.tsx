import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SellFormAction, SellFormState, SellFormStepEnum } from '../types';
import { SellFormData } from '../schemas/sellFormSchema';
import { reducer, initialState } from '../reducer/useSellFormReducer';

interface SellFormContextType {
  state: SellFormState;
  dispatch: React.Dispatch<SellFormAction>;
  formData: Partial<SellFormData>;
  stepIndex: SellFormStepEnum;
}

const SellFormContext = createContext<SellFormContextType | undefined>(undefined);

interface SellFormProviderProps {
  children: ReactNode;
}

export function SellFormProvider({ children }: SellFormProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: SellFormContextType = {
    state,
    dispatch,
    formData: state.formData,
    stepIndex: state.stepIndex,
  };

  return <SellFormContext.Provider value={value}>{children}</SellFormContext.Provider>;
}

export function useSellForm() {
  const context = useContext(SellFormContext);
  if (context === undefined) {
    throw new Error('useSellForm must be used within a SellFormProvider');
  }
  return context;
}
