import axios from 'axios';
import { ICliente } from '../interfaces';

export const getAllClientes = async () => {
  const { data } = await axios.get(`/api/clientes`);
  return data.data;
};
export const createNewCliente = async (data: ICliente) => await axios.post(`/api/clientes`, data);
