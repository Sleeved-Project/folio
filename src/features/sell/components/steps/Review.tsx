import React from 'react';
import { View, Text, Button } from 'react-native';
import { SellFormAction } from '../../types';
import { SellFormData } from '../../schemas/sellFormSchema';

interface ReviewStepProps {
  dispatch: React.Dispatch<SellFormAction>;
  formData: Partial<SellFormData>;
}

export default function ReviewStep({ formData, dispatch }: ReviewStepProps) {
  const onSubmit = () => {
    console.log('Formulaire final :', formData);
    alert('Formulaire soumis avec succès 🎉');
  };

  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Récapitulatif :</Text>
      <Text>Nom : {formData.name}</Text>
      <Text>Choix : {formData.choice}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <Button title="Retour" onPress={() => dispatch({ type: 'PREV_STEP' })} />
        <Button title="Soumettre" onPress={onSubmit} />
      </View>
    </View>
  );
}
