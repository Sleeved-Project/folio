import { FormDataFile } from '../../../lib/client/types';
import { SellFormData } from '../schemas/sellFormSchema';

export function mapSellFormDataToFormData(formData: Partial<SellFormData>): FormData {
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

  return formDataToSend;
}
