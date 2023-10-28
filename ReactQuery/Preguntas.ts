import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { createNewPregunta, getAllPreguntas } from '../services/pregunta.service';
import { IPregunta } from '../interfaces';

const queryClient = new QueryClient();

export const queryPreguntas = (id: string) => {
  return useQuery({
    queryKey: ['preguntas'],
    queryFn: () => getAllPreguntas(Number(id)),
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
};

export const mutatePreguntas = () => {
  return useMutation({
    mutationFn: (pregunta: IPregunta) => createNewPregunta(pregunta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preguntas'] });
    },
    onError: (error) => {},
  });
};
