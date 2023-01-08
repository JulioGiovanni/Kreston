import axios from 'axios';
import { IPregunta } from '../interfaces';

export const getAllPreguntas = async (id: number) => {
  const data = await axios.get(`/api/preguntas/${id}`);

  return data.data;
};
export const createNewPregunta = (pregunta: IPregunta) => axios.post('/api/preguntas', pregunta);
export const updatePregunta = (pregunta: IPregunta) =>
  axios.put(`/api/preguntas/${pregunta.id}`, pregunta);
export const updatePositionPregunta = (data: IPregunta[]) => axios.put(`/api/preguntas/`, data);
