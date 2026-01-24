import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  createNewPregunta,
  getAllPreguntas,
  updatePositionPregunta,
  updatePregunta,
} from '../services/pregunta.service';
import { IPregunta } from '../interfaces';

const queryClient = new QueryClient();

export const queryPreguntas = (id: string) => {
  return useQuery({
    queryKey: ['preguntas'],
    queryFn: () => getAllPreguntas(Number(id)),
  });
};

export const mutatePreguntas = () => {
  return useMutation({
    mutationKey: ['preguntas'],
    mutationFn: (pregunta: IPregunta) => createNewPregunta(pregunta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preguntas'] });
    },
    onError: (error) => {},
  });
};

export const mutatePregunta = (id: number) => {
  return useMutation({
    mutationKey: ['preguntas', id],
    mutationFn: (pregunta: IPregunta) => updatePregunta(pregunta),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preguntas', id] });
    },
    onError: (error) => {},
  });
};

const mutatePreguntasPosition = () => {
  return useMutation({
    mutationKey: ['preguntas'],
    mutationFn: (data: IPregunta[]) => updatePositionPregunta(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preguntas'] });
    },
    onError: (error) => {},
  });
};
