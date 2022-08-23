import { IPregunta } from '../interfaces';
import axios from 'axios';

export const PreguntaApi = {
  createNewPregunta: (pregunta: IPregunta) => axios.post('/api/preguntas', pregunta),
  updatePregunta: (pregunta: IPregunta) => axios.put(`/api/preguntas/${pregunta.id}`, pregunta),
  updatePositionPregunta: (data: IPregunta[]) => axios.put(`/api/preguntas/`, data),
};
