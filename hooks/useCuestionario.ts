import useSWR from 'swr';
import { getAllCuestionarios } from '../services/cuestionario.service';

export const useCuestionario = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/cuestionario', getAllCuestionarios);
  return {
    Cuestionario: data,
    error,
    isLoading,
    mutate,
  };
};
