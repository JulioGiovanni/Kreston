import useSWR from 'swr';
import { getAllOficinas } from '../services/oficina.service';

export const useAllOffice = () => {
  const { data, error, isLoading } = useSWR('/api/oficinas', getAllOficinas);
  return {
    Oficinas: data,
    error,
    isLoading,
  };
};
