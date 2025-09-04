import { useMutation } from '@tanstack/react-query';
import { SellFormData } from '../../schemas/sellFormSchema';

interface SellFormPayload {
  rectoImage: string;
  versoImage: string;
  name: string;
  condition: string;
  finish: string;
  price: number;
  certificationId?: string;
}

function mapFormDataToPayload(formData: Partial<SellFormData>): SellFormPayload {
  return {
    rectoImage: formData.rectoImage!,
    versoImage: formData.versoImage!,
    name: formData.name!,
    condition: formData.condition!,
    finish: formData.finish!,
    price: Number(formData.price)!,
    certificationId: formData.certification?.id,
  };
}

const submitSellForm = async (formData: Partial<SellFormData>) => {
  const payload = mapFormDataToPayload(formData);
  console.log('Submitting payload:', payload);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, id: 'MOCK_ID_123', ...payload };
};

export function useSubmitSellForm() {
  return useMutation({
    mutationFn: submitSellForm,
  });
}
