import { ErrorsState } from './';


type ErrorsActionType =
|{type: '[Errors] - New Error',payload: {message: string,type:string}}
|{type: '[Errors] - Remove Error'}


export const errorsReducer = (state:ErrorsState, action:ErrorsActionType ):ErrorsState => {
    switch (action.type) {
        case '[Errors] - New Error':
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type
            };
        case '[Errors] - Remove Error':
            return {
                ...state,
                message: '',
                type: ''
            };
        default:
            return state;
    }
};