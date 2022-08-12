import { createContext } from 'react';
import { PayloadData, PayloadTypes } from './dataReducer';


interface ContextProps {
    Usuarios: [],
    Oficinas: [],
    Areas: [],
    Proyectos: [],
    Roles: [],

    //Funciones
    setNewData: (data:PayloadData,type: PayloadTypes) => void,
    setInitialData: (data:any) => void,
}



export const DataContext = createContext({} as ContextProps);