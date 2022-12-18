import useSWR from 'swr';
import { getAllProyectos } from '../services/proyecto.service';
export const useAllProyectos = () => {
  const { data, isLoading, error } = useSWR('/api/proyectos', getAllProyectos);
  return { Proyectos: data, isLoading, error };
};
