import axios from 'axios';
import { IPregunta } from '../interfaces';

export const getAllPreguntas = async (id: number) => {
  const response = await axios.get(`/api/preguntas/${id}`);
  return response.data.data;
};
export const createNewPregunta = async (pregunta: IPregunta) => {
  const data = await axios.post('/api/preguntas', pregunta);
  return data.data;
};
export const updatePregunta = (pregunta: IPregunta) =>
  axios.patch(`/api/preguntas/${pregunta.id}`, pregunta);
export const updatePositionPregunta = (data: IPregunta[]) =>
  axios.put(`/api/preguntas/${data[0].cuestionarioId}`, data);
export const deletePregunta = (id: number) => axios.delete(`/api/preguntas/${id}`);
