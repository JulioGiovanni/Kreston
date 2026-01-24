import { createNewArea, getAllAreas, getArea } from '../services/area.service';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { IArea } from '../interfaces';

const queryClient = new QueryClient();

export const queryAreas = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['areas'],
    queryFn: () => getAllAreas(),
  });
  return {
    Areas: data,
    isLoading,
    isError,
  };
};

export const queryArea = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['area', id],
    queryFn: () => getArea(id),
  });
  return {
    Area: data,
    isLoading,
    isError,
  };
};

export const mutateAreas = async () => {
  useMutation({
    mutationFn: (newArea: IArea) => createNewArea(newArea),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });
    },
  });
};
