import { FC, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { API } from '../../API';
import { User } from '../../interfaces';
import { AuthContext, authReducer } from '.'; //Cambiar Reducer a minúsculas
import { showNotification } from '@mantine/notifications';
import { CheckIcon,Cross1Icon } from '@modulz/radix-icons';
import { jwt } from '../../utils';

export interface LoginState{
    User: User | null;
    isLogged: boolean;
    message:string | null;
}

const LOGIN_INITIAL_STATE: LoginState = {
    User: null,
    isLogged: false,
    message: null
}

interface Props {
    children: any;
}

export const AuthProvider:FC<Props> = ({ children }) => {
    const router = useRouter();
    const {login,validate} = API.LoginApi
    const [state, dispatch] = useReducer(authReducer, LOGIN_INITIAL_STATE); //Cambiar Reducer a minúsculas
    
    const checkToken = async() =>{
        if(!Cookies.get('token')) return;
        try {
            const response = await validate();
            const user:User = response.data.user;
            Cookies.set('token', response.data.token);
            dispatch({
                type: '[AUTH] - Login',
                payload: user
            });
        } catch (error) {
            Cookies.remove('token');
        }
    }

    useEffect(() => {
        checkToken();
    }, [])
    
    const Login = async (correo:string,password:string) => {
        try {
            const response = await login(correo,password);
            if(response.status === 200){
                const user:User = response.data.user;
                Cookies.set('token', response.data.token);
                showNotification({
                    title: 'Inicio de sesión',
                    message: 'Inicio de sesión exitoso',
                    autoClose: 3000,
                    color: 'teal',
                    icon: <CheckIcon />
                    
                  })
                dispatch({
                    type: '[AUTH] - Login',
                    payload: user
                });

                router.replace('/');
            }
            
        } catch (error:any) {

            if (error.response.status === 401) {
                showNotification({
                    title: 'Inicio de sesión fallido',
                    message: error.response.data.message,
                    autoClose: 3000,
                    color: 'red',
                    icon: <Cross1Icon />
                })
                dispatch({
                    type: '[AUTH] - Error',
                    payload: error.response.data.type + '_' + error.response.data.message
                });
            }else{

                showNotification({
                    title: 'Inicio de sesión fallido',
                    message: 'Ocurrió un error, intente de nuevo más tarde',
                    autoClose: 3000,
                    color: 'red',
                    icon: <Cross1Icon />
                })
                dispatch({
                    type: '[AUTH] - Error',
                    payload: 'Error al iniciar sesión'
                });
            }
        }
    }

    const Logout = async () => {
        dispatch({
            type: '[AUTH] - Logout'
        });
        Cookies.remove('token');
        router.replace('/login');
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            Login,
            Logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}