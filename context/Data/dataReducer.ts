import { IOficina, IUsuario, IArea, ICuestionario, IProyecto, IRole } from '../../interfaces';
import { DataState } from './';


export type PayloadTypes = "Usuarios" | "Oficinas" | "Areas" | "Proyectos" | "Roles";
export type PayloadData = IUsuario | IOficina | IArea | IProyecto | IRole | ICuestionario;


type DataActionType =
|{type: '[Data] - Estado inicial', payload: any}
|{type: '[Data] - Agregar nuevo registro', payload: {type: PayloadTypes, data: PayloadData}}
|{type: '[Data] - Eliminar registro', payload: string}
// |{type: '[Entries] - Editar entrada', payload: {id:string,description:string,status:EntryStatus}}
// |{type: '[Entries] - Cambiar estado de entrada', payload: {id: string, status: EntryStatus}}


export const dataReducer = (state:DataState, action:DataActionType ):DataState => {
    switch (action.type) {
        case '[Data] - Estado inicial':            
        const initialData = action.payload
            return {
                ...state,
                Usuarios: initialData.Usuarios,
                Oficinas: initialData.Oficinas,
                Areas: initialData.Areas,
                // Proyectos: initialData.Proyectos,
                Roles: initialData.Roles,
            };
        case '[Data] - Agregar nuevo registro':
        let { type, data } = action.payload;
            return {
                ...state,
                [type]: [...state[type] , data]
            };
        default:
            return state;
    }
};