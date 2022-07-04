import { FC, useReducer } from 'react';
import { ErrorsContext,errorsReducer } from './'; //Cambiar Reducer a minúsculas


export interface ErrorsState{
    message: string;
    type: string;
}

const Errors_INITIAL_STATE: ErrorsState = {
    message: '',
    type: '',
}

interface Props {
    children: any;
}

export const ErrorsProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(errorsReducer, Errors_INITIAL_STATE); //Cambiar Reducer a minúsculas

    const setNewError = (message:string,type:string) => {
        dispatch({
            type: '[Errors] - New Error',
            payload: {
                message,
                type,
            }
        });
    }


    const removeError = () => {
        dispatch({
            type: '[Errors] - Remove Error',
        });
    }
    

    return (
        <ErrorsContext.Provider value={{
            ...state,
            setNewError,
            removeError
        }}>
            { children }
        </ErrorsContext.Provider>
    )
}