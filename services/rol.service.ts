import axios from 'axios';
import { IRole } from '../interfaces';

export const getAllRoles = async () => {
  const { data } = await axios.get(`/api/roles`);
  return data.data;
};
export const createNewRol = async (nombre: IRole) => await axios.post(`/api/roles`, { nombre });
