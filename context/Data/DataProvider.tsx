import { FC, useReducer, useEffect } from 'react';
import { DataContext, dataReducer } from './index'; //Cambiar Reducer a minúsculas
import { PayloadData, PayloadTypes } from './dataReducer';
import { useRouter } from 'next/router';
import { UserApi } from '../../API/UserApi';
import { OficinaApi } from '../../API/OficinaApi';
import { AreaApi } from '../../API/AreaAPI';
import { RolApi } from '../../API/RolApi';
import { IUsuario } from '../../interfaces/usuario.interface';
import { IOficina } from '../../interfaces/oficina.interface';
import { IArea } from '../../interfaces/area.interface';
import { IRole } from '../../interfaces/role.interface';


export interface DataState{
    Usuarios: [],
    Oficinas: [],
    Areas: [],
    Proyectos: [],
    Roles: [],
}

const DATA_INITIAL_STATE: DataState = {
    Usuarios: [],
    Oficinas: [],
    Areas: [],
    Proyectos: [],
    Roles: [],
}

interface Props {
    children: any;
}

export const DataProvider:FC<Props> = ({ children }) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(dataReducer, DATA_INITIAL_STATE); //Cambiar Reducer a minúsculas

    const setInitialData = async () =>{
        const [usuarios, oficinas, areas, roles] = await Promise.all([
            UserApi.getAllUsers(),
            OficinaApi.getAllOficinas(),
            AreaApi.getAllAreas(),
            RolApi.getAllRoles()
        ]);
        
        const AllUsers :IUsuario[] = usuarios.data.data;
        const AllOficinas :IOficina[] = oficinas.data.data; 
        const AllAreas :IArea[] = areas.data.data;
        const AllRoles :IRole[]  = roles.data.data;

        dispatch({
            type: '[Data] - Estado inicial',
            payload: {
                Usuarios: AllUsers,
                Oficinas: AllOficinas,
                Areas: AllAreas,
                Proyectos: [],
                Roles: AllRoles
            }
        });
    }

    const setNewData = (data:PayloadData,type: PayloadTypes) => {
        dispatch({
            type: '[Data] - Agregar nuevo registro',
            payload: {
                data,
                type,
            }
        });
    }

    useEffect(() => {
        setInitialData();
        console.log('Iniciar datos');
    }, [])

    return (
        <DataContext.Provider value={{
            ...state,
            setInitialData,
            setNewData,
        }}>
            { children }
        </DataContext.Provider>
    )
}