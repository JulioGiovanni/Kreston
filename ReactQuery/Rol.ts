import { QueryClient, useQuery } from '@tanstack/react-query';
import { getAllRoles } from '../services/rol.service';

export const queryRoles = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['roles'],
    queryFn: getAllRoles,
  });
  return {
    Roles: data,
    isLoading,
    isError,
  };
};
