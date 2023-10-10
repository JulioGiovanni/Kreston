import { useQuery } from '@tanstack/react-query';
import { getAllPreguntas } from '../services/pregunta.service';
export const queryPreguntas = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['preguntas'],
    queryFn: () => getAllPreguntas(id),
  });
  return { Preguntas: data, isLoading, isError };
};
