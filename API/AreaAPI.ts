import axios from 'axios';
import { IArea } from '../interfaces/area.interface';

export const AreaApi = {
  getAllAreas: async () => await axios.get(`/api/areas`),
  createNewArea: async (data: IArea) => await axios.post(`/api/areas`, { data }),
};
