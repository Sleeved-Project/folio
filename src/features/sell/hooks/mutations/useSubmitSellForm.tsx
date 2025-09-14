import { useMutation } from '@tanstack/react-query';
import { SellFormData } from '../../schemas/sellFormSchema';
import { FormDataFile } from '../../../../lib/client/types';
import { httpClient } from '../../../../lib/client/http-client';

// interface SellFormDataToSend {
//   rectoImage: string;
//   versoImage: string;
//   cardId: string;
//   condition: string;
//   finish: string;
//   price: number;
//   certificationId?: string;
// }

interface CreateAdResponse {
  message: string;
}

// function mapFormDataToSellFormDataToSend(formData: Partial<SellFormData>): SellFormDataToSend {
//   return {
//     rectoImage: formData.rectoImage!,
//     versoImage: formData.versoImage!,
//     condition: formData.condition!,
//     cardId: formData.cardId!,
//     finish: formData.finish!,
//     price: Number(formData.price)!,
//     certificationId: formData.certification?.id,
//   };
// }

const submitSellForm = async (formData: Partial<SellFormData>) => {
  const rectoFile: FormDataFile = {
    uri: formData.rectoImage!,
    type: 'image/jpeg',
    name: 'recto_photo.jpg',
  };

  const versoFile: FormDataFile = {
    uri: formData.versoImage!,
    type: 'image/jpeg',
    name: 'verso_photo.jpg',
  };

  const formDataToSend = new FormData();

  formDataToSend.append('rectoFile', rectoFile as unknown as Blob);
  formDataToSend.append('versoFile', versoFile as unknown as Blob);

  formDataToSend.append('cardId', formData.cardId || '');
  formDataToSend.append('price', formData.price?.toString() || '');
  formDataToSend.append('conditionId', formData.condition || '');
  formDataToSend.append('finishId', formData.finish || '');

  if (formData.certification?.id) {
    formDataToSend.append('certificateId', formData.certification.id);
  }

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
