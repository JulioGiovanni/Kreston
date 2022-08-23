import axios from 'axios';
import { APIURL } from '../utils/GlobalVariables';

export const RolApi = {
  getAllRoles: async () => await axios.get(`/api/roles`),
  createNewRol: async (nombre: string) => await axios.post(`/api/roles`, { nombre }),
};
