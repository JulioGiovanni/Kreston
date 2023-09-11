import {
  getAllClientes,
  getCliente,
  createNewCliente,
  updateCliente,
} from '../services/cliente.service';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ICliente } from '../interfaces';

const queryClient = new QueryClient();

export const queryClientes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => getAllClientes(),
  });
  return {
    Clientes: data,
    isLoading,
    isError,
  };
};

export const queryCliente = (id: Number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['clientes', id],
    queryFn: () => getCliente(id),
  });
  return {
    Cliente: data,
    isLoading,
    isError,
  };
};

export const mutateCliente = async (id: Number, Cliente: ICliente) => {
  const mutation = useMutation({
    mutationFn: (newCliente: ICliente) => updateCliente(id, newCliente),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
    },
  });
  mutation.mutate(Cliente);
};
