import { useQuery } from '@tanstack/react-query';
import { SellFormData } from '../schemas/sellFormSchema';

// Mock data fetching function
const fetchEstimatedPrice = async (formData: Partial<SellFormData>): Promise<number> => {
  console.log('Fetching estimated price with data:', formData);
  await new Promise((resolve) => setTimeout(resolve, 800));
  return 45.99;
};

export function useEstimatedPrice(formData: Partial<SellFormData>) {
  const { rectoImage, condition, finish } = formData;

  return useQuery({
    queryKey: ['estimated-price', rectoImage, condition, finish],
    queryFn: () => fetchEstimatedPrice(formData),
    enabled: !!(rectoImage && condition && finish),
    staleTime: 5 * 60 * 1000,
  });
}
