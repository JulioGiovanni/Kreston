import { createContext } from 'react';
import { User } from '../../interfaces';


interface ContextProps {
    isLogged: boolean;
    User: User | null;
    message: string | null;

    //Métodos
    Login: (correo: string, password: string) => void;
    Logout: () => void;

}



export const AuthContext = createContext({} as ContextProps);