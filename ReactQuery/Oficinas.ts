import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getAllOficinas } from '../services/oficina.service';

const queryClient = new QueryClient();
export const queryOficinas = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['oficinas'],
    queryFn: () => getAllOficinas(),
  });
  return {
    Oficinas: data,
    isLoading,
    isError,
  };
};

export const mutateOficinas = async () => {
  useMutation({
    mutationFn: () => getAllOficinas(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['oficinas'] });
    },
  });
};
