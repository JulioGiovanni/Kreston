import axios from 'axios';
import { IArea } from '../interfaces/area.interface';

export const getAllAreas = async () => {
  const { data } = await axios.get(`/api/areas`);
  return data.data;
};

export const getArea = async (id: string) => {
  const { data } = await axios.get(`/api/areas/${id}`);
  return data.data;
};
export const createNewArea = async (data: IArea) => await axios.post(`/api/areas`, { data });
