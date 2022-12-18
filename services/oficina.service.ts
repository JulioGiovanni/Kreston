import axios from 'axios';
import { IOficina } from '../interfaces/oficina.interface';

export const getAllOficinas = async () => {
  const { data } = await axios.get(`/api/oficinas`);
  return data.data;
};
export const createNewOficina = async (data: IOficina) =>
  await axios.post(`/api/oficinas`, { data });
