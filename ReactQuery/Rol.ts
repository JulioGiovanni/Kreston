import useSWR from 'swr';
import { getAllRoles } from '../services/rol.service';
export const useAllRoles = () => {
  const { data, isLoading, error } = useSWR('/api/roles', getAllRoles);
  return {
    Roles: data,
    isLoading,
    error,
  };
};
