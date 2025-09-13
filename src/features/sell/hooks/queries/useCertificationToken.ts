import { useQuery } from '@tanstack/react-query';

let serverTokenCount = 10;

const fetchCertificationTokenCount = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return serverTokenCount;
};

export const useCertificationToken = () => {
  const query = useQuery({
    queryKey: ['certification-token'],
    queryFn: fetchCertificationTokenCount,
    staleTime: 5 * 60 * 1000,
  });

  const decrementToken = () => {
    if (serverTokenCount > 0) {
      serverTokenCount--;
      query.refetch();
    }
  };

  return {
    ...query,
    decrementToken,
  };
};
