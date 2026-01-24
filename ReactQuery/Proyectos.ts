import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { createNewProyecto, getAllProyectos } from '../services/proyecto.service';
const queryClient = new QueryClient();

export const queryProyectos = (nombre?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['proyectos', { nombre }],
    queryFn: () => getAllProyectos(nombre),
    enabled: true,
  });
  return {
    Proyectos: data,
    isLoading,
    isError,
  };
};

export const mutateProyectos = async (Proyecto: any) => {
  const mutation = useMutation({
    mutationFn: (newProyecto: any) => createNewProyecto(newProyecto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['proyectos'],
        exact: true,
      });
    },
  });
  mutation.mutate(Proyecto);
};
