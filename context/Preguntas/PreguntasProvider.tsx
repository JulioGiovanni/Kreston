import { FC, useReducer } from 'react';
import { PreguntasContext, preguntasReducer } from './'; //Cambiar Reducer a minúsculas
import { IPregunta } from '../../interfaces';
import { createNewPregunta } from '../../services/pregunta.service';

export interface PreguntasState {
  preguntas: IPregunta[];
}

const PREGUNTAS_INITIAL_STATE: PreguntasState = {
  preguntas: [],
};

interface Props {
  children: any;
}

export const PreguntasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(preguntasReducer, PREGUNTAS_INITIAL_STATE); //Cambiar Reducer a minúsculas

  const traerPreguntas = (preguntas: IPregunta[]) => {
    dispatch({
      type: '[Preguntas] - Traer Preguntas',
      payload: preguntas,
    });
  };

  const agregarPregunta = async (pregunta: IPregunta) => {
    try {
      const data = await createNewPregunta(pregunta);
      const newPregunta = data.data;
      dispatch({
        type: '[Preguntas] - Agregar Pregunta',
        payload: newPregunta,
      });
    } catch (error) {
      //TODO: Agregar error al state de errores
      //NOTE - Quizá con un toast de error
      console.log(error);
    }
  };

  return (
    <PreguntasContext.Provider
      value={{
        ...state,
        traerPreguntas,
        agregarPregunta,
      }}
    >
      {children}
    </PreguntasContext.Provider>
  );
};
