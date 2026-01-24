import { createContext } from 'react';
import { IPregunta } from '../../interfaces';

interface ContextProps {
  preguntas: IPregunta[];

  //Métodos
  traerPreguntas: (preguntas: IPregunta[]) => void;
  agregarPregunta: (pregunta: IPregunta) => void;
}

export const PreguntasContext = createContext({} as ContextProps);
