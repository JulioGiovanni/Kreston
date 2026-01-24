import axios from 'axios';
import { ICuestionario } from '../interfaces/cuestionario.interface';

export const getAllCuestionarios = async () => {
  const { data } = await axios.get('/api/cuestionario');
  return data.data;
};

export const createNewCuestionario = async (data: ICuestionario) =>
  await axios.post('/api/cuestionario', { data });
