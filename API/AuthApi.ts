import axios from 'axios';

export const AuthApi = {
  login: async (correo: string, contrasena: string) => {
    console.log('login');
    return await axios.post(`/api/auth/login`, {
      correo,
      contrasena,
    });
  },
  logout: async () => await axios.post(`/api/auth/logout`),
  validate: async () => await axios.get(`/api/auth/jwt`),
};
