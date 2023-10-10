import axios from 'axios';
import { IUsuario } from '../interfaces/usuario.interface';

export const getAllUsers = async (nombre?: string, rol?: number) => {
  let url = `/api/users`;
  if (nombre) {
    url = `/api/users?nombre=${nombre}`;
  }
  if (rol) {
    url = `/api/users?rol=${rol}`;
  }
  const { data } = await axios.get(url);
  return data.data;
};
export const createNewUser = async (data: any) => await axios.post(`/api/users`, { data });
export const getUser = async (id: any) => await axios.get(`/api/users/:${id}`);
export const updateUser = async (id: any, data: any) =>
  await axios.put(`/api/users/${id}`, { data });
export const deleteUser = async (id: any) => await axios.delete(`/api/users/${id}`);
export const reactiveUser = async (id: any) => await axios.patch(`/api/users/${id}`);
