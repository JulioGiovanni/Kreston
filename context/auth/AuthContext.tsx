import { createContext } from 'react';
import { IUsuario } from '../../interfaces';


interface ContextProps {
    isLogged: boolean;
    User: IUsuario | null;
    message: string | null;

    //Métodos
    Login: (correo: string, password: string) => void;
    Logout: () => void;

}



export const AuthContext = createContext({} as ContextProps);