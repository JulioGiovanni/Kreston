import axios from 'axios';
import { IProyecto } from '../interfaces';

export const getAllProyectos = async (nombre?: string) => {
  let url = '/api/proyectos';

  if (nombre) {
    url = `/api/proyectos?nombre=${nombre}`;
  }

  const { data } = await axios.get(url);
  return data.data;
};
export const createNewProyecto = async (data: IProyecto) =>
  await axios.post(`/api/proyectos`, { data });
