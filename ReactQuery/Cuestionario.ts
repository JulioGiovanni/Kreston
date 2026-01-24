import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ICuestionario } from '../interfaces';
import { createNewCuestionario, getAllCuestionarios } from '../services/cuestionario.service';

const queryClient = new QueryClient();

export const queryCuestionarios = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cuestionarios'],
    queryFn: () => getAllCuestionarios(),
  });
  return { Cuestionarios: data, isLoading, isError };
};

export const mutateCuestionarios = () => {
  useMutation({
    mutationFn: (newCuestionario: ICuestionario) => createNewCuestionario(newCuestionario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cuestionarios'] });
    },
  });
};
