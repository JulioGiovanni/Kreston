import { PreguntasState } from './';
import { IPregunta } from '../../interfaces';

type PreguntasActionType =
  | { type: '[Preguntas] - Traer Preguntas'; payload: IPregunta[] }
  | { type: '[Preguntas] - Agregar Pregunta'; payload: IPregunta };

export const preguntasReducer = (
  state: PreguntasState,
  action: PreguntasActionType
): PreguntasState => {
  switch (action.type) {
    case '[Preguntas] - Traer Preguntas':
      return {
        ...state,
        preguntas: action.payload,
      };
    case '[Preguntas] - Agregar Pregunta':
      return {
        ...state,
        preguntas: [...state.preguntas, action.payload],
      };
    default:
      return state;
  }
};
