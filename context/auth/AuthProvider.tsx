import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import Cookies from 'js-cookie';
import { API } from '../../API';
import { IUsuario } from '../../interfaces';
import { AuthContext, authReducer } from '.'; //Cambiar Reducer a minúsculas
import { showNotification } from '@mantine/notifications';
import { CheckIcon, Cross1Icon } from '@modulz/radix-icons';

export interface LoginState {
  User: IUsuario | null;
  isLogged: boolean;
  message: string | null;
}

const LOGIN_INITIAL_STATE: LoginState = {
  User: null,
  isLogged: false,
  message: null,
};

interface Props {
  children: any;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const { login, validate } = API.LoginApi;
  const [state, dispatch] = useReducer(authReducer, LOGIN_INITIAL_STATE); //Cambiar Reducer a minúsculas

  useEffect(() => {
    console.log(data);
    console.log(status);
    if (status === 'authenticated') {
      dispatch({ type: '[AUTH] - Login', payload: data?.user as IUsuario });
    }
  }, [status, data]);

  const Login = async (correo: string, password: string) => {
    try {
      const response = await login(correo, password);
      if (response.status === 200) {
        console.log('login');
        const user: IUsuario = response.data.user;
        Cookies.set('token', response.data.token);
        showNotification({
          title: 'Inicio de sesión',
          message: 'Inicio de sesión exitoso',
          autoClose: 3000,
          color: 'teal',
          icon: <CheckIcon />,
        });
        dispatch({
          type: '[AUTH] - Login',
          payload: user,
        });
        console.log(user);
        router.replace('/');
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        showNotification({
          title: 'Inicio de sesión fallido',
          message: error.response.data.message,
          autoClose: 3000,
          color: 'red',
          icon: <Cross1Icon />,
        });
        dispatch({
          type: '[AUTH] - Error',
          payload: error.response.data.type + '_' + error.response.data.message,
        });
      } else {
        showNotification({
          title: 'Inicio de sesión fallido',
          message: 'Ocurrió un error, intente de nuevo más tarde',
          autoClose: 3000,
          color: 'red',
          icon: <Cross1Icon />,
        });
        dispatch({
          type: '[AUTH] - Error',
          payload: 'Error al iniciar sesión',
        });
      }
    }
  };

  const Logout = async () => {
    dispatch({
      type: '[AUTH] - Logout',
    });
    // Cookies.remove('token');
    // router.replace('/login');
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
