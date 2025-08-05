import React from 'react';
import { View, Text } from 'react-native';
import { steps } from '../../reducer/useSellFormReducer';

interface StepperProps {
  currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
      {steps.map((step, index) => (
        <View key={step} style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontWeight: currentStep === index ? 'bold' : 'normal' }}>{step}</Text>
          {index < steps.length - 1 && <Text>→</Text>}
        </View>
      ))}
    </View>
  );
}
