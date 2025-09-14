import { useMutation } from '@tanstack/react-query';
import { SellFormData } from '../../schemas/sellFormSchema';
import { httpClient } from '../../../../lib/client/http-client';
import { mapSellFormDataToFormData } from '../../mappers/sellFormMapper';

interface CreateAdResponse {
  message: string;
}

const submitSellForm = async (formData: Partial<SellFormData>) => {
  const formDataToSend = mapSellFormDataToFormData(formData);
  const response = await httpClient.post<CreateAdResponse>('/ads', formDataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export function useSubmitSellForm() {
  return useMutation({
    mutationFn: submitSellForm,
  });
}
