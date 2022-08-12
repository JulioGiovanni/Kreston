import { IUsuario } from '../../interfaces';
import { LoginState } from '.';


type LoginActionType =
|{type: '[AUTH] - Login', payload:IUsuario}
|{type: '[AUTH] - Veryfy Token',payload:IUsuario}
|{type: '[AUTH] - Logout'}
|{type: '[AUTH] - Error', payload:string}


export const authReducer = (state:LoginState, action:LoginActionType ):LoginState => {
    switch (action.type) {
        case '[AUTH] - Login':
            return {
                ...state,
                isLogged: true,
                User: action.payload,
                message: null
            };
        case '[AUTH] - Error':
            return {
                ...state,
                User: null,
                isLogged: false,
                message: action.payload
            };
        case '[AUTH] - Logout':
            return {
                ...state,
                isLogged: false,
                User: null,
                message: 'Logout exitoso',
            };
        case '[AUTH] - Veryfy Token':
            return {
                ...state,
                isLogged: true,
                User: action.payload,
                message: null
            };
        default:
            return state;
    }
};