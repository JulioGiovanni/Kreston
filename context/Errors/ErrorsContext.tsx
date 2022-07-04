import { createContext } from 'react';


interface ContextProps {
    message: string;
    type: string;
    setNewError: (message: string, type: string) => void;
    removeError: () => void;
}



export const ErrorsContext = createContext({} as ContextProps);