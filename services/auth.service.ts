import axios from 'axios';

export const login = async (correo: string, contrasena: string) =>
  await axios.post(`/api/auth/login`, { correo, contrasena });

export const logout = async () => await axios.post(`/api/auth/logout`);
export const validate = async () => await axios.get(`/api/auth/jwt`);
