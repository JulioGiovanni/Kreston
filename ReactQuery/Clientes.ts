import {
  getAllClientes,
  getCliente,
  createNewCliente,
  updateCliente,
  getAllClientesPaginated,
} from '../services/cliente.service';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { ICliente } from '../interfaces';

const queryClient = new QueryClient();

export const queryClientes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => getAllClientes(),
    enabled: true,
  });
  return {
    Clientes: data,
    isLoading,
    isError,
  };
};
export const queryClientesPaginated = (nombre?: string, page = 1, perPage = 10) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['clientes', { nombre, page, perPage }],
    queryFn: () => getAllClientesPaginated(nombre, page, perPage),
    enabled: true,
  });
  return {
    Clientes: data?.data,
    total: data?.total,
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
export const mutateClientes = async (Cliente: ICliente) => {
  return useMutation({
    mutationFn: (newCliente: ICliente) => createNewCliente(newCliente),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clientes'],
        exact: true,
      });
    },
  });
};
