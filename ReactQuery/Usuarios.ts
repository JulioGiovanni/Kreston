import { createNewUser, getAllUsers, getUser, updateUser } from '../services/usuarios.service';
import { IUsuario } from '../interfaces/usuario.interface';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const user_roles = {
  ADMIN: 1,
  GERENTE: 2,
  SOCIO: 3,
  ENCARGADO: 4,
  SOCIO_CALIDAD: 5,
  USUARIO: 6,
};

export const queryUsers = (nombre?: string, rol?: number) => {
  let queryFn = () => getAllUsers();
  let queryKey = ['users'];
  if (nombre) {
    queryKey = ['users', nombre];
    queryFn = () => getAllUsers(nombre);
  }
  if (rol) {
    queryKey = ['users', rol.toString()];
    queryFn = () => getAllUsers(undefined, rol);
  }
  const { data, isError, isLoading } = useQuery({
    queryKey,
    queryFn: () => queryFn(),
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
