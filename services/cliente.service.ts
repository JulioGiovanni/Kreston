import axios from 'axios';
import { ICliente } from '../interfaces';

export const getAllClientes = async () => {
  let url = `/api/clientes`;
  try {
    const { data } = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllClientesPaginated = async (nombre?: string, page = 1, perPage = 10) => {
  let url = `/api/clientes?page=${page}&perPage=${perPage}`;
  if (nombre) {
    url += `&nombre=${nombre}`;
  }
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCliente = async (id: Number) => {
  const { data } = await axios.get(`/api/clientes/${id}`);
  return data.data;
};

export const createNewCliente = async (data: ICliente) => await axios.post(`/api/clientes`, data);

export const updateCliente = async (id: Number, data: ICliente) =>
  await axios.put(`/api/clientes/${id}`, data);
