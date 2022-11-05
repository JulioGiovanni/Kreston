import axios from 'axios';

export const auth = {
  login: (username: string, password: string) => {
    return axios.post('/login', { username, password });
  },
};
