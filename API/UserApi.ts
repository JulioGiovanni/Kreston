import axios from 'axios';
import { APIURL } from '../utils/GlobalVariables';

export const UserApi = {
    getAllUsers: async () =>  await axios.get(`/api/users`),
    createNewUser: async (data:any)=> await axios.post(`/api/users`,{data}),
    getUser: async (id:any) => await axios.get(`/api/users/:${id}`),
    updateUser: async (id:any,data:any) => await axios.put(`/api/users/${id}`,{data}),
    deleteUser: async (id:any) => await axios.delete(`/api/users/${id}`),
    reactiveUser: async (id:any) => await axios.patch(`/api/users/${id}`),
}