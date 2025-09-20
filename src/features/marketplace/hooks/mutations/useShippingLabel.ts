import { useMutation } from '@tanstack/react-query';

const useDownloadShippingLabel = async (adId: string) => {
  console.log('Downloading shipping label for adId:', adId);
  await new Promise((resolve) => setTimeout(resolve, 800));
  const pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
  return pdfUrl;
};

export const useShippingLabel = (adId: string) => {
  return useMutation({
    mutationFn: () => useDownloadShippingLabel(adId),
    onError: (error) => {
      console.error('Error downloading shipping label:', error);
    },
  });
};
