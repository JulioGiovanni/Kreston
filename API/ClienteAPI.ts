import axios from 'axios';
import { ICliente } from '../interfaces';

export const ClienteApi = {
  getAllClientes: async () => await axios.get(`/api/clientes`),
  createNewCliente: async (data: ICliente) => await axios.post(`/api/clientes`, data),
};
