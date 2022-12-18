import useSWR from 'swr';
import { getAllUsers, getUser } from '../services/usuarios.service';
import { IUsuario } from '../interfaces/usuario.interface';
export const useUserId = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/users/${id}`, getUser);
  return {
    data,
    error,
    isLoading,
  };
};

export const useAllUsers = () => {
  const { data, error, isLoading } = useSWR('/api/users', getAllUsers);
  return {
    Usuarios: data,
    error,
    isLoading,
  };
};
