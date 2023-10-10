import axios from 'axios';

export const getAllAceptacionAnual = async (page = 1, perPage = 10) => {
  const { data } = await axios.get(`/api/aceptacion/anual?page=${page}&perPage=${perPage}`);
  return data;
};
