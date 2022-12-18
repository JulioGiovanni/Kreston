import axios from 'axios';
import { IProyecto } from '../interfaces';

export const getAllProyectos = async () => {
  const { data } = await axios.get(`/api/proyectos`);
  return data.data;
};
export const createNewProyecto = async (data: IProyecto) =>
  await axios.post(`/api/proyectos`, { data });
