import { createNewUser, getAllUsers, getUser, updateUser } from '../services/usuarios.service';
import { IUsuario } from '../interfaces/usuario.interface';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const queryUsers = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
  });

  return {
    Usuarios: data,
    isError,
    isLoading,
  };
};

export const queryUser = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
  return {
    Usuario: data,
    isError,
    isLoading,
  };
};

export const mutateUsers = async () => {
  useMutation({
    mutationFn: (newUser: IUsuario) => createNewUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const mutateUser = async (id: String) => {
  useMutation({
    mutationFn: (newUser: IUsuario) => updateUser(id, newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
