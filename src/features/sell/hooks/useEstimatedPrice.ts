import { useQuery } from '@tanstack/react-query';
import { SellFormData } from '../schemas/sellFormSchema';
import { httpClient } from '../../../lib/client/http-client';
import { AdvicePriceInputDTO } from '../types';
import { CurrencyEnum, formatAdvicePriceMapper } from '../mappers/advicePriceMapper';

const fetchEstimatedPrice = async (formData: Partial<SellFormData>): Promise<string> => {
  if (!formData.cardId || !formData.condition || !formData.finish) {
    throw new Error('Card ID is required for price estimation');
  }
  const response = await httpClient.get<AdvicePriceInputDTO>(
    `/cards/${formData.cardId}/advices?conditions=${formData.condition}&finishes=${formData.finish}`
  );

  return formatAdvicePriceMapper(response.advicePrice, CurrencyEnum.EUR);
};

export function useEstimatedPrice(formData: Partial<SellFormData>) {
  const { cardId, condition, finish } = formData;

  return useQuery({
    queryKey: ['estimated-price', cardId, condition, finish],
    queryFn: () => fetchEstimatedPrice(formData),
    enabled: !!(cardId && condition && finish),
    staleTime: 5 * 60 * 1000,
  });
}
