import useSWR from 'swr';
import { getAllPreguntas } from '../services/pregunta.service';

export const UsePregunta = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(`/api/preguntas/${id}`, (url) =>
    fetch(url).then(async (response: any) => {
      const data = await response.json();
      return data.data;
    })
  );
  return {
    Preguntas: data,
    error,
    isLoading,
    mutate,
  };
};
