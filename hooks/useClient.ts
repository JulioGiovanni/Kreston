import { getAllClientes } from '../services/cliente.service';
import useSWR from 'swr';

export const useAllClient = () => {
  const { data, isLoading, error } = useSWR('/api/clientes', getAllClientes);
  return {
    Clientes: data,
    isLoading,
    error,
  };
};
