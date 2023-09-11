import axios from 'axios';
import { ICliente } from '../interfaces';

export const getAllClientes = async () => {
  const { data } = await axios.get(`/api/clientes`);
  return data.data;
};

export const getCliente = async (id: Number) => {
  const { data } = await axios.get(`/api/clientes/${id}`);
  return data.data;
};

export const createNewCliente = async (data: ICliente) => await axios.post(`/api/clientes`, data);

export const updateCliente = async (id: Number, data: ICliente) =>
  await axios.put(`/api/clientes/${id}`, data);
