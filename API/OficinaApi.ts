import axios from "axios";
import { APIURL } from "../utils/GlobalVariables";

export const OficinaApi = {
    getAllOficinas: async () => await axios.get(`/api/oficinas`),
    createNewOficina: async (data: any) => await axios.post(`/api/oficinas`, { data }),

}